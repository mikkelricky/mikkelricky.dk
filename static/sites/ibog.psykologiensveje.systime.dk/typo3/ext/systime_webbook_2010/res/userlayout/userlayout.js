(function() {
	var
	Dom = YAHOO.util.Dom, Event = YAHOO.util.Event,

	LANG = {
		'default': {
			'Full width': 'Full width',
			'Full width on': 'Full width on',
			'Full width off': 'Full width off',
			'Hide navigation': 'Hide navigation',
			'Show navigation': 'Show navigation',
			'Text size normal': 'Normal text size',
			'Text size larger': 'Larger text size',
			'Text size smaller': '-',
			'Text size larger': '+'
		},
		'da': {
			'Yes': 'Ja',
			'yes': 'ja',
			'No': 'Nej',
			'no': 'nej',
			'Normal' : 'Normal',
			'normal' : 'normal',
			'Full width': 'Fuld bredde',
			'Full width on': 'Fuld bredde',
			'Full width off': 'Ikke fuld bredde',
			'Hide navigation': 'Skjul navigation',
			'Hide navigation on': 'Skjul navigation',
			'Hide navigation off': 'Vis navigation',
			'Show navigation': 'Vis navigation',
			'Text Size': 'Tekststørrelse',
			'Text size normal': 'Normal tekststørrelse',
			'Text size smaller': 'Mindre tekststørrelse',
			'Text size larger': 'Større tekststørrelse',
			'Line Height': 'Linjehøjde',
			'Line height normal': 'Normal linjehøjde',
			'Line height smaller': 'Mindre linjehøjde',
			'Line height larger': 'Større linjehøjde',
			'Page Width': 'Sidebredde',
			'User Layout': 'Brugerstyret design'
		}
	},

	debug = function() {
		if ((typeof(console) != 'undefined') && (typeof(console.debug) == 'function')) {
			;;; console.debug.apply(console, arguments);
		}
	},

	getFullWidth = function(on) {
		return Dom.hasClass(document.body, 'systime-full-width');
	},

	setFullWidth = function(on) {
		Dom[on ? 'addClass' : 'removeClass'](document.body, 'systime-full-width');
		document.cookie = 'systime-full-width='+(on ? 1 : 0)+'; path=/';
	},

	toggleFullWidth = function() {
		setFullWidth(!getFullWidth());
	},

	getHideNavigation = function(on) {
		return Dom.hasClass(document.body, 'systime-hide-navigation');
	},

	setHideNavigation = function(on) {
		;;; debug('setHideNavigation', arguments);
		Dom[on ? 'addClass' : 'removeClass'](document.body, 'systime-hide-navigation');
		document.cookie = 'systime-hide-navigation='+(on ? 1 : 0)+'; path=/';
	},

	toggleHideNavigation = function() {
		setHideNavigation(!getHideNavigation());
	},

	/**
	 * Change text size
	 *
	 * @param int delta
	 */
 	changeTextSize = function(delta) {
		try {
			var i,
			el = document.body,
			classNamePrefix = 'systime-text-size-',
			currentTextSize = 0,
			newTextSize,
			minTextSize = -4,
			maxTextSize = 4;

			delta = parseInt(delta);
			if (isNaN(delta)) {
				return;
			}

			for (i = minTextSize; i <= maxTextSize; i++) {
				if (Dom.hasClass(el, classNamePrefix+i)) {
					currentTextSize = i;
					Dom.removeClass(el, classNamePrefix+i);
				}
			}

			if (delta == 0) {
				newTextSize = 0;
			} else {
				newTextSize = currentTextSize+delta;
			}

			if (newTextSize < minTextSize) {
				newTextSize = minTextSize;
			} else if (maxTextSize < newTextSize) {
				newTextSize = maxTextSize;
			}

			if (newTextSize != 0) {
				if ((minTextSize <= newTextSize) && (newTextSize <= maxTextSize)) {
					Dom.addClass(el, classNamePrefix+newTextSize);
				}
			}

			// ;;; debug('changeTextSize', currentTextSize, delta, newTextSize);

			document.cookie = 'systime-text-size='+newTextSize+'; path=/';
		} catch (ex) {
			;;; debug('changeTextSize', ex);
			// alert(ex);
		}
	},

	/**
	 * Change line height
	 *
	 * @param int delta
	 */
	changeLineHeight = function(delta) {
		try {
			var i,
			el = document.body,
			classNamePrefix = 'systime-line-height-',
			currentLineHeight = 0,
			newLineHeight,
			minLineHeight = 0,
			maxLineHeight = 4;

			delta = parseInt(delta);
			if (isNaN(delta)) {
				return;
			}

			for (i = minLineHeight; i <= maxLineHeight; i++) {
				if (Dom.hasClass(el, classNamePrefix+i)) {
					currentLineHeight = i;
					Dom.removeClass(el, classNamePrefix+i);
				}
			}

			if (delta == 0) {
				newLineHeight = 0;
			} else {
				newLineHeight = currentLineHeight+delta;
			}

			if (newLineHeight < minLineHeight) {
				newLineHeight = minLineHeight;
			} else if (maxLineHeight < newLineHeight) {
				newLineHeight = maxLineHeight;
			}

			if (newLineHeight != 0) {
				if ((minLineHeight <= newLineHeight) && (newLineHeight <= maxLineHeight)) {
					Dom.addClass(el, classNamePrefix+newLineHeight);
				}
			}

			// ;;; debug('changeLineHeight', currentLineHeight, delta, newLineHeight);

			document.cookie = 'systime-line-height='+newLineHeight+'; path=/';
		} catch (ex) {
			;;; debug('changeLineHeight', ex);
		}
	},

	langCode = 'default',

	setLanguage = function() {
		el = document.documentElement;
		if (el) {
			if (el.getAttribute('lang')) {
				langCode = el.getAttribute('lang').toLowerCase();
			} else if (el.getAttribute('xml:lang')) {
				langCode = el.getAttribute('xml:lang').toLowerCase();
			}
		}
		// ;;; debug('setLanguage', 'langCode', langCode);
	},

	translate = function(value) {
		if (LANG) {
			if (LANG[langCode] && LANG[langCode][value]) {
				return LANG[langCode][value];
			} else if (LANG['default'] && LANG['default'][value]) {
				return LANG['default'][value];
			}
		}
		return value;
	},

	overlay,
	fullWidthToggle,
	hideNavigationToggle,

	createUI = function() {
		setLanguage();

		setLanguage();
		overlay = new YAHOO.widget.Overlay('userlayout-overlay', {
			xy: [ 200, 0 ],
			visible: true,
			// width: '300px'
			width: 'auto'
		});

		overlay.setBody('');

		fullWidthToggle = new YAHOO.widget.Button({
			id: 'userlayout-full-width',
			type: 'checkbox',
			label: translate(getFullWidth() ? 'Full width off' : 'Full width on'),
			container: overlay.body,
			checked: getFullWidth()
		});

		fullWidthToggle.addListener('checkedChange', function() {
			var on = this.get('checked');
			setFullWidth(on);
			fullWidthToggle.set('label', translate(on ? 'Full width off' : 'Full width on'));
			// fullWidthToggle.set('title', translate(on ? 'Full width off' : 'Full width on'));
		});

		hideNavigationToggle = new YAHOO.widget.Button({
			id: 'userlayout-hide-navigation',
			type: 'checkbox',
			label: translate(getHideNavigation() ? 'Show navigation' : 'Hide navigation'),
			container: overlay.body,
			checked: getHideNavigation()
		});
		hideNavigationToggle.addListener('checkedChange', function() {
			// ;;; debug('setHideNavigation', this);
			var on = this.get('checked');
			setHideNavigation(on);
			hideNavigationToggle.set('label', translate(on ? 'Show navigation' : 'Hide navigation'));
		});

		/* Text Size */
		textSizeNormal = new YAHOO.widget.Button({
			id: 'userlayout-textsize-normal',
			label: translate('Text size normal'),
			title: translate('Text size normal'),
			container: overlay.body,
			onclick: {
				fn: function() {
					changeTextSize(0);
				}
			}
		});

		textSizeDec = new YAHOO.widget.Button({
			id: 'userlayout-textsize-dec',
			label: translate('Text size smaller'),
			title: translate('Text size smaller'),
			container: overlay.body,
			onclick: {
				fn: function() {
					changeTextSize(-1);
				}
			}
		});

		textSizeInc = new YAHOO.widget.Button({
			id: 'userlayout-textsize-inc',
			label: translate('Text size larger'),
			title: translate('Text size larger'),
			container: overlay.body,
			onclick: {
				fn: function() {
					changeTextSize(+1);
				}
			}
		});

		lineHeightNormal = new YAHOO.widget.Button({
			id: 'userlayout-lineheight-normal',
			label: translate('Line height normal'),
			title: translate('Line height normal'),
			container: overlay.body,
			onclick: {
				fn: function() {
					changeLineHeight(0);
				}
			}
		});

		lineHeightDec = new YAHOO.widget.Button({
			id: 'userlayout-lineheight-dec',
			label: translate('Line height smaller'),
			title: translate('Line height smaller'),
			container: overlay.body,
			onclick: {
				fn: function() {
					changeLineHeight(-1);
				}
			}
		});

		lineHeightInc = new YAHOO.widget.Button({
			id: 'userlayout-lineheight-inc',
			label: translate('Line height larger'),
			title: translate('Line height larger'),
			container: overlay.body,
			onclick: {
				fn: function() {
					changeLineHeight(+1);
				}
			}
		});

		overlay.render(document.body);
	},

	dialog = null,

	showDialog = function() {
		var skinStyle = Dom.getElementsBy(function(el) {
			if ((Dom.getAttribute(el, 'type') == 'text/css')
					&& (Dom.getAttribute(el, 'media') == 'screen')
					&& (Dom.getAttribute(el, 'href') && (Dom.getAttribute(el, 'href').indexOf('systime_webbook_skins/skins/build/') > -1))) {
				return true;
			}
			return false;
		}, 'link', document.head)[0];
		;;; debug('skinStyle', skinStyle);

		if (skinStyle) {
			Dom.setAttribute(skinStyle, 'href', 'typo3conf/ext/systime_webbook_skins/skins/build/default-blue-default/skin.css');
			Dom.setAttribute(skinStyle, 'href', 'typo3conf/ext/systime_webbook_skins/skins/build/default-red-default/skin.css');
		}

		if (!dialog) {
			try {
				dialog = new YAHOO.widget.Dialog('userlayout-dialog', {
					width: '24em',
					fixedcenter: true,
					close: true,
					draggable: true,
					zindex: 4,
					// modal: true,
					visible: false
				});
				dialog.setHeader(translate('User Layout'));

				var list, item, label, buttonGroup, button;
				list = document.createElement('ul');

				item = document.createElement('li');
				label = document.createElement('label');
				label.innerHTML = translate('Full width');
				item.appendChild(label);

				// button = new YAHOO.widget.Button({
				// 	type: 'checkbox',
				// 	label: translate(getFullWidth() ? 'Full width off' : 'Full width on'),
				// 	container: item,
				// 	checked: getFullWidth()
				// });
				// button.addListener('checkedChange', function() {
				// 	var on = this.get('checked');
				// 	setFullWidth(on);
				// 	this.set('label', translate(on ? 'Full width off' : 'Full width on'));
				// });
				// list.appendChild(item);

				buttonGroup = new YAHOO.widget.ButtonGroup({
					container: item
				});
				buttonGroup.addButtons([
					{
						type: 'radio',
						label: translate('Yes'),
						title: translate('Full width on'),
						checked: getFullWidth(),
						onclick: {
 							fn: function() { setFullWidth(true); }
						}
					},
					{
						type: 'radio',
						label: translate('No'),
						title: translate('Full width off'),
						checked: !getFullWidth(),
						onclick: {
 							fn: function() { setFullWidth(false); }
						}
					}
				]);
				list.appendChild(item);

				item = document.createElement('li');
				label = document.createElement('label');
				label.innerHTML = translate('Hide navigation');
				item.appendChild(label);

				// button = new YAHOO.widget.Button({
				// 	type: 'checkbox',
				// 	label: translate(getHideNavigation() ? 'Show navigation' : 'Hide navigation'),
				// 	container: item,
				// 	checked: getHideNavigation()
				// });
				// button.addListener('checkedChange', function() {
				// 	// ;;; debug('setHideNavigation', this);
				// 	var on = this.get('checked');
				// 	setHideNavigation(on);
				// 	this.set('label', translate(on ? 'Show navigation' : 'Hide navigation'));
				// });

				buttonGroup = new YAHOO.widget.ButtonGroup({
					container: item
				});
				buttonGroup.addButtons([
					{
						type: 'radio',
						label: translate('Yes'),
						title: translate('Hide navigation on'),
						checked: getHideNavigation(),
						onclick: {
 							fn: function() { setHideNavigation(true); }
						}
					},
					{
						type: 'radio',
						label: translate('No'),
						title: translate('Hide navigation off'),
						checked: !getHideNavigation(),
						onclick: {
							fn: function() { setHideNavigation(false); }
						}
					}
				]);

				list.appendChild(item);

				item = document.createElement('li');
				label = document.createElement('label');
				label.innerHTML = translate('Text Size');
				item.appendChild(label);

				button = new YAHOO.widget.Button({
					label: translate('-'),
					title: translate('Text size smaller'),
					container: item,
					onclick: {
						fn: function() {
							changeTextSize(-1);
						}
					}
				});
				button = new YAHOO.widget.Button({
					label: translate('Normal'),
					title: translate('Text size normal'),
					container: item,
					onclick: {
						fn: function() {
							changeTextSize(0);
						}
					}
				});
				button = new YAHOO.widget.Button({
					label: translate('+'),
					title: translate('Text size larger'),
					container: item,
					onclick: {
						fn: function() {
							changeTextSize(+1);
						}
					}
				});
				list.appendChild(item);

				item = document.createElement('li');
				label = document.createElement('label');
				label.innerHTML = translate('Line Height');
				item.appendChild(label);

				button = new YAHOO.widget.Button({
					label: translate('-'),
					title: translate('Line height smaller'),
					container: item,
					onclick: {
						fn: function() {
							changeLineHeight(-1);
						}
					}
				});
				button = new YAHOO.widget.Button({
					label: translate('Normal'),
					title: translate('Line height normal'),
					container: item,
					onclick: {
						fn: function() {
							changeLineHeight(0);
						}
					}
				});
				button = new YAHOO.widget.Button({
					label: translate('+'),
					title: translate('Line height larger'),
					container: item,
					onclick: {
						fn: function() {
							changeLineHeight(+1);
						}
					}
				});
				list.appendChild(item);

				dialog.appendToBody(list);

				dialog.render(document.body);
			} catch (ex) {
				;;; debug('dialog', ex);
			}
		}

		;;; debug('dialog', dialog);
		if (dialog) {
			dialog.show();
			;;; debug(dialog.cfg.setProperty('fixedcenter', false));
		}
	},

	initialize = function() {
		try {
			var matches;

			setFullWidth(document.cookie.indexOf("systime-full-width=1") > -1);
			setHideNavigation(document.cookie.indexOf("systime-hide-navigation=1") > -1);
			matches = /systime-text-size=(-?[0-9]+)/.exec(document.cookie);
			if (matches) {
				changeTextSize(parseInt(matches[1]));
			}
			matches = /systime-line-height=(-?[0-9]+)/.exec(document.cookie);
			if (matches) {
				changeLineHeight(parseInt(matches[1]));
			}
		} catch(ex) {
			;;; debug('initialize', ex);
		}
	}

	Event.onDOMReady(initialize);
	// Event.onDOMReady(createUI);

	// Expose methods for use from outside this script
	YAHOO.namespace('systime.userlayout');

	YAHOO.systime.userlayout.toggleFullWidth = toggleFullWidth;
	YAHOO.systime.userlayout.toggleHideNavigation = toggleHideNavigation;
	YAHOO.systime.userlayout.changeTextSize = changeTextSize;
	YAHOO.systime.userlayout.changeLineHeight = changeLineHeight;

	YAHOO.systime.userlayout.createUI = createUI;

	YAHOO.systime.userlayout.showDialog = showDialog;
}());
