YAHOO.namespace('systime.toggle');

(function() {
	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event,

	COOKIE_NAME = 'systime_toggle_elements',
	CLASSNAME_TOGGLE = 'systime-toggle',
	CLASSNAME_EXPANDED = 'expanded',
	CLASSNAME_TOGGLABLE = 'togglable',

	debug = function() {
		// return;
		if ((typeof(console) != 'undefined') && (typeof(console.debug) == 'function')) {
			console.debug.apply(console, arguments);
		}
	},

	getElementId = function(el) {
		var id = el.id,
		match = id ? /-([0-9]+)$/.exec(id) : null;
		if (match) {
			return parseInt(match[1]);
		}
	},

	/**
	 * Get an array of expanded element ids
	 *
	 * @return Object
	 */
	getExpandedElementIds = function() {
		var i, id, value, ids, expandedElementIds = {};
		if (YAHOO.util.Cookie) {
			value = YAHOO.util.Cookie.get(COOKIE_NAME);
			ids = value ? value.split(',') : [];
			for (i = 0; i < ids.length; i++) {
				id = parseInt(ids[i]);
				if (!isNaN(id)) {
					expandedElementIds[id] = true;
				}
			}
			;;; debug('getExpandedElements', value, expandedElementIds);
		}
		return expandedElementIds;
	},

	setExpandedElementIds = function(expandedElementIds) {
		var p, value, ids;
		if (YAHOO.util.Cookie) {
			ids = [];
			for (p in expandedElementIds) {
				if (YAHOO.lang.hasOwnProperty(expandedElementIds, p)) {
					ids.push(p);
				}
			}
			;;; debug('setExpandedElements', expandedElementIds, ids);
			value = ids ? ids.join(',') : '';
			YAHOO.util.Cookie.set(COOKIE_NAME, value);
		}
	},

	toggle = function(evt) {
		;;; debug('toggle', this, this.parentNode.id);
		var id = getElementId(this.parentNode),
		expandedElementIds = getExpandedElementIds(),
		expanded = false;
		;;; debug('id', id);
		if (Dom.hasClass(this.parentNode, CLASSNAME_EXPANDED)) {
			Dom.removeClass(this.parentNode, CLASSNAME_EXPANDED);
		} else {
			Dom.addClass(this.parentNode, CLASSNAME_EXPANDED);
			expanded = true;
		}
		Event.stopEvent(evt);

		;;; debug('expandedElements', expandedElementIds);
		if (expanded) {
			expandedElementIds[id] = 1;
		} else {
			delete expandedElementIds[id];
		}
		setExpandedElementIds(expandedElementIds);
	},

	createTogglable = function(el) {
		if (Dom.hasClass(el, CLASSNAME_TOGGLABLE)) {
			var header = Dom.getFirstChildBy(el, function(e) { return Dom.hasClass(e, 'hd'); }),
			body = Dom.getFirstChildBy(el, function(e) { return Dom.hasClass(e, 'bd'); });

			;;; debug('el', el);
			;;; debug('header', header);
			;;; debug('body', body);

			Event.on(header, 'click', toggle);
		}
	}

	initialize = function() {
		try {
			;;; debug('systime.toggle.initialize');
			var p, el,
			expandedElementIds = getExpandedElementIds();
			for (p in expandedElementIds) {
				if (YAHOO.lang.hasOwnProperty(expandedElementIds, p)) {
					el = Dom.get('systime-toggle-'+p);
					if (el) {
						Dom.addClass(el, CLASSNAME_EXPANDED);
					}
				}
			}
			Dom.getElementsByClassName(CLASSNAME_TOGGLE, 'div', 'content', createTogglable);
		} catch (ex) {
			;;; debug(ex);
			YAHOO.log(ex);
		}
	}

	Event.onDOMReady(initialize);
}());
