(function() {
	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event,

	debug = function() {
		if ((typeof(console) != 'undefined') && (typeof(console.debug) == 'function')) {
			;;; console.debug.apply(console, arguments);
		}
	},

	LANG = {
		'default': {
			'Get link': 'ID',
			'Get link to here': 'Get link to here',
			'Deep link': 'Deep link',
			'Key': 'Key'
		},
		'da': {
			'Get link': 'Id',

			// 'Get page link': 'Side-id',
			// 'Get content link': 'Id',

			'Page link': 'Sidens direkte link og id',
			'Content link': 'Afsnittets direkte link og id',

			'Get page link': '<span class="label">Side&#xB7;id</span><span class="id"> {id}</span>',
			'Get content link': '<span class="label">Id</span><span class="id"> {id}</span>',

			'Get link to here': 'Link til dette indhold',
			'Get link to this page': 'Link til denne side',
			'Get link to this content': 'Link til dette afsnit',

			'Deep link': 'Direkte link',
			'Key': 'Id',
			'Search for this key': 'Du kan finde indholdet ved at søge på dette id',
			'Search for this page key': 'Du kan finde siden ved at søge på dette id',
			'Search for this content key': 'Du kan finde afsnittet ved at søge på dette id'
		}
	},

	translation,

	initTranslation = function() {
		var langCode = 'default',
		el = document.documentElement;
		if (el) {
			if (el.getAttribute('lang')) {
				langCode = el.getAttribute('lang').toLowerCase();
			} else if (el.getAttribute('xml:lang')) {
				langCode = el.getAttribute('xml:lang').toLowerCase();
			}
		}
		if (LANG[langCode]) {
			translation = LANG[langCode];
		}
	},

	translate = function(value) {
		return (translation && translation[value]) ? translation[value] : value;
	},

	// tooltip,
	panel, urlField, keyField,

	contentElementIdPattern = new RegExp('^c[0-9]+$'),

	isContentElementId = function(id) {
		return id && contentElementIdPattern.test(id);
	}

	getContentElement = function(el) {
		while (el && !isContentElementId(el.id)) {
			el = el.parentNode;
		}
		return el;
	},

	getContentElementId = function(el) {
		el = getContentElement(el);
		return el && el.id && isContentElementId(el.id) ? el.id : null;
	},

	getPageId = function() {
		return pageInfo.id;
	}

	// CSS selectors for getting header elements
	headerSelectors = [
		{ root: 'page-header',
			selector: 'h1' },
		{ root: 'content',
			selector: '.csc-header h1, .csc-header h2, .csc-header h3' }
	],

	createPermalink = true,
	createLinkIcon = true,

	processHeader = function(header, buttons) {
		var contentElementId, permalink, icon, child, children, i;
		if (header && header.appendChild) {
			contentElementId = getContentElementId(header);

			if (contentElementId) {
				var el = document.getElementById(contentElementId);
				if (el) {
					// Store header text for later use by "AddThis"
					el.contentTitle = header.innerHTML.replace(new RegExp('<[^>]*>', 'g'), '');
				}
			}

			if (createPermalink) {
				if (contentElementId) {
					permalink = document.createElement('a');
					Dom.addClass(permalink, 'permalink');
					permalink.href = document.location.href.replace(/#.*/, '')+'#'+contentElementId;
					permalink.title = translate('Permalink');
					children = [];
					for (child = header.firstChild; child; child = child.nextSibling) {
						children.push(child);
					}
					for (i = 0; i < children.length; i++) {
						child = children[i];
						permalink.appendChild(child.parentNode.removeChild(child));
					}
					header.appendChild(permalink);
				}
			}

			if (createLinkIcon) {
				header.appendChild(document.createTextNode(' '));
				// Create icon
				icon = document.createElement('span');
				Dom.addClass(icon, 'linktohere');
				icon.innerHTML = YAHOO.lang.substitute(translate(contentElementId ? 'Get content link' : 'Get page link'), { id: contentElementId ? contentElementId : getPageId() });
				if (contentElementId) {
					icon.title = translate('Get link to this content');
				} else {
					icon.title = translate('Get link to this page');
				}
				header.appendChild(icon);
				// Dom.insertBefore(el, headers[i].firstChild);
				buttons.push(icon);
			}
		}
	},

	updateAddThis = function(url, contentElementId) {
		//@TODO Get content title when contentElementId is set
		var el, title;
		title = pageInfo.pageTitle ? pageInfo.pageTitle : document.title;
		if (contentElementId) {
			el = document.getElementById(contentElementId);
			if (el && el.contentTitle) {
				// title += ': '+el.contentTitle;
				title = el.contentTitle;
			}
		}

		// @see http://www.addthis.com/forum/viewtopic.php?f=3&t=22217&start=30
		if (addthis && addthis.update) {
			window.addthis.update('share', 'url', url);
			if (title) {
				window.addthis.update('share', 'title', title);
			}
		}
	}

	initialize = function() {
		var urlHelp, keyHelp, i, buttons, headers, container, tagNames, body;

		if (typeof pageInfo == 'undefined') {
			return;
		}

		initTranslation();

		try {
			buttons = [];
			headers = [];
			container = 'content';
			tagNames = [ 'h1', 'h2', 'h3' ];

			// for (i = 0; i < headerSelectors.length; i++) {
			// 	headers.push.apply(headers, Dom.getElementsBy(function(el) {
			// }

			for (i = 0; i < tagNames.length; i++) {
				headers.push.apply(headers, Dom.getElementsBy(function(el) {
					if (Dom.hasClass(el.parentNode, 'csc-header') && getContentElement(el)) {
						return true;
					}
				}, tagNames[i], container));
			}

			headers.push(Dom.getElementBy(function(el) {
				return true;
			}, 'h1', 'page-header'));

			;;; debug('headers', headers);

			for (i = 0; i < headers.length; i++) {
				processHeader(headers[i], buttons);
			}

			panel = new YAHOO.widget.Panel('linktohere-panel', {
				context: [ 'content', 'tl', 'bl' ],
				visible: false,
				draggable: false
				// , width: '300px'
			});

			// @see http://developer.yahoo.com/yui/examples/container/keylistener.html
			panel.cfg.queueProperty('keylisteners', new YAHOO.util.KeyListener(document, { keys: 27 },
																																				 { fn: panel.hide,
																																					 scope: panel,
																																					 correctScope:true } ));

			// urlField = document.createElement('input');
			// urlField.id = 'linktohere-url';
			// urlField.type = 'text';
			// urlField.setAttribute('readonly', 'readonly');
			// Event.on(urlField, 'focus', function(event) { this.select(); });
			// keyField = document.createElement('input');
			// keyField.id = 'linktohere-key';
			// keyField.type = 'text';
			// keyField.setAttribute('readonly', 'readonly');
			// Event.on(keyField, 'focus', function(event) { this.select(); });

			// var item, label, container;
			// container = document.createElement('ul');

			// item = document.createElement('li');
			// label = document.createElement('label');
			// label.innerHTML = translate('Url');
			// item.appendChild(label);
			// item.appendChild(urlField);

			// container.appendChild(item);

			// item = document.createElement('li');
			// label = document.createElement('label');
			// label.innerHTML = translate('Key');
			// item.appendChild(label);
			// item.appendChild(keyField);
			// container.appendChild(item);

			// panel.setHeader(translate('Get link to here'));
			panel.setHeader('&#160;');
			// panel.setBody(container);

			urlHelp = pageInfo.urlHelpUrl ? '<a class="help" target="linktoherehelp" title="'+translate('Help')+'" href="'+encodeURI(pageInfo.urlHelpUrl)+'">'+translate('Help')+'</a>' : '';
			keyHelp = pageInfo.keyHelpUrl ? '<a class="help" target="linktoherehelp" title="'+translate('Help')+'" href="'+encodeURI(pageInfo.keyHelpUrl)+'">'+translate('Help')+'</a>' : '';

			body = '<ul>'
				+'<li>'
				+'<label for="linktohere-url">'+translate('Deep link')+'</label>'
				+'<input id="linktohere-url" type="text" readonly="readonly"/>'
			// +urlHelp
				+'</li>'
				+'<li>'
				+'<label for="linktohere-key">'+translate('Key')+'</label>'
				+'<input id="linktohere-key" type="text" readonly="readonly"/>'
				+'<span id="linktohere-key-info" class="info">'+translate('Search for this key')+'</span>'
			// +keyHelp
				+'</li>'
				+'</ul>';

			body += '<div class="clearfix">'
				+'<div id="linktohere-addthis" class="addthis_toolbox addthis_default_style">'
				+'<a class="addthis_button_diigo"></a>'
				+'<a class="addthis_button_facebook"></a>'
				+'<a class="addthis_button_email"></a>'
				+'<a class="addthis_button_compact"></a>'
				+'</div>'
				+'</div>';

			panel.setBody(body);

			panel.render('content');

			// Dom.addClass(tooltip.element, 'triangle-isosceles');


			Event.on(buttons, 'click', function(event) {
				var
				context = panel.cfg.getProperty('context'),
				// url = (typeof pageInfo.url != 'undefined') ? pageInfo.url : location.href.replace(/#.*/, ''),
				url = (typeof pageInfo.pageUrl != 'undefined') ? pageInfo.pageUrl : location.href.replace(/#.*/, ''),
				contentElementId = getContentElementId(this),
				pageId = getPageId();

				context[0] = this.parentNode;
				if (!urlField) {
					urlField = Dom.get('linktohere-url'),
					Event.on(urlField, 'focus', function(event) { this.select(); });
				}
				if (!keyField) {
					keyField = Dom.get('linktohere-key');
					Event.on(keyField, 'focus', function(event) { this.select(); });
				}

				panel.cfg.setProperty('context', context);
				// panel.cfg.setProperty('width', Dom.getRegion(context[0]).width+'px');
				// alert(Dom.getRegion(context[0]).width+'px');
				panel.cfg.setProperty('width', '500px');

				urlField.value = '';
				keyField.value = '';

				if (contentElementId) {
					url = pageInfo.contentUrl.replace('___CONTENT_ID___', contentElementId);
					keyField.value = contentElementId;
				}
				if (!keyField.value) {
					keyField.value = pageId;
				}
				urlField.value = url;
				try {
					urlField.focus();
				} catch (ex) {}

				updateAddThis(url, contentElementId);

				if (contentElementId) {
					if (Dom.get('linktohere-key-info')) {
						Dom.get('linktohere-key-info').innerHTML = translate('Search for this content key');
					}
					panel.setHeader(translate('Content link'));
				} else {
					if (Dom.get('linktohere-key-info')) {
						Dom.get('linktohere-key-info').innerHTML = translate('Search for this page key');
					}
					panel.setHeader(translate('Page link'));
				}
				panel.show();
				// var context = tooltip.cfg.getProperty('context');
				// context[0] = Event.getTarget(event);
				// tooltip.cfg.setProperty('context', context);
				// tooltip.show();
			});

		} catch (ex) {
			;;; debug('initialize', ex);
		}
	}

	Event.onDOMReady(initialize);
}());

if (typeof(systime) == 'undefined') {
	systime = {};
}

(function() {
	var Dom = YAHOO.util.Dom; //Event = YAHOO.util.Event,

	// debug = function() {
	// 	if ((typeof(console) != 'undefined') && (typeof(console.debug) == 'function')) {
	// 		;;; console.debug.apply(console, arguments);
	// 	}
	// }

	systime.contentSearch = function(control, searcher, query) {
		var resultsContainer, searchUrl, renderResult, callback, request;
		resultsContainer = document.getElementById('systimegooglesearch-content-result');
		if (resultsContainer) {
			searchUrl = '/?eID=linktohere&format=json&q='+encodeURI(query),

			callback = {
				success: function(o) {
					var result;
					Dom.setStyle(resultsContainer, 'display', 'none');
					try {
						result = YAHOO.lang.JSON.parse(o.responseText);
						if (result && result.content) {
							resultsContainer.innerHTML = result.content;
							Dom.setStyle(resultsContainer, 'display', 'block');
						}
					} catch (ex) {}
				},

				failure: function(o) {
					Dom.setStyle(resultsContainer, 'display', 'none');
					// Dom.setStyle(resultsContainer, 'display', 'block');
					// resultsContainer.innerHTML = 'failure';
				}
			}
			;
			// contentSearchResult.innerHTML = 'Searching for '+query+' ['+searchUrl+'] ...';

			request = YAHOO.util.Connect.asyncRequest('GET', searchUrl, callback);
		}
	}
}());
