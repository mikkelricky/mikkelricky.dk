YAHOO.namespace("systime.glossary");

(function() {
	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event,

  debug = function() {
		// if ((typeof(console) != "undefined") && (typeof(console.debug) == "function")) {
		// 	;;; console.debug.apply(console, arguments);
		// }
	},

	stripTags = function(s) {
		if (s) {
			s = s.replace(/<[^>]+>/g, '');
		}
		return s;
	},

	/**
	 * Set innerHTML
	 */
	setContent = function(el, html) {
		try {
			el.innerHTML = html;
		} catch (ex) {
			try {
				el.innerHTML = stripTags(html);
			} catch (ex) {
			}
		}
	},

	glossaryMap, pageGlossary, glossaryTerms, glossaryTermsExtra,

	// The overlay
	glossaryPopup,
	// Header
	descriptionHeader,
	// Body
	descriptionDescription,
	descriptionMore,
	descriptionDescriptionExtra,

	descriptionTarget,
	lastShownKey,
	glossaryConfig,

	pageGlossaryDisplays,

	// Timeout for hiding overlay
	showTimer = null,

	setShowTimer = function() {
		hideDescription();
		clearShowTimer();
		showTimer = setTimeout(showDescription, YAHOO.systime.glossary.SHOW_TIMEOUT);
		// showDescription();
	},

	clearShowTimer = function() {
		if (showTimer) {
			clearTimeout(showTimer);
			showTimer = null;
		}
	},

	showDescription = function() {
		// ;;; debug("showDescription");
		clearHideTimer();
		clearShowTimer();
		setDescriptionData(lastShownKey);
		alignOverlay(descriptionTarget);
		// ;;; debug("glossaryPopup.show()");
		glossaryPopup.show();
		// glossaryPopup.render();
		if (descriptionTarget) {
			Dom.addClass(descriptionTarget, YAHOO.systime.glossary.ACTIVE_TERM_CLASSNAME);
		}
	},

	// Timeout for hiding overlay
	hideTimer = null,

	setHideTimer = function() {
		clearHideTimer();
    hideTimer = setTimeout(hideDescription, YAHOO.systime.glossary.HIDE_TIMEOUT);
	},

	clearHideTimer = function() {
		if (hideTimer) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}
	},

	hideDescription = function() {
		// ;;; debug("hideDescription");
		clearHideTimer();
		if (glossaryPopup.cfg.getProperty("visible")) {
			// ;;; debug("glossaryPopup.hide()");
			if (descriptionTarget) {
				Dom.removeClass(descriptionTarget, YAHOO.systime.glossary.ACTIVE_TERM_CLASSNAME);
			}
			glossaryPopup.hide();
		}
	},

	lastAlignElement = null,

	alignOverlay = function(element) {
		var region, xy;

		if (element == lastAlignElement) {
			// return;
		}
		element = element || lastAlignElement;
		if (element) {
			// ;;; debug("alignOverlay", element);
			glossaryPopup.cfg.setProperty("context", [ element, YAHOO.widget.Overlay.TOP_LEFT, YAHOO.widget.Overlay.BOTTOM_LEFT ]);

			// If overlay overflows bottom of viewport, move it above context element if there's room for it
			region = Dom.getRegion(glossaryPopup.element);
			xy = Dom.getXY(element);
			debug("region", region);
			debug("element", xy, region.bottom-region.top);
			if ((region.bottom > Dom.getDocumentScrollTop()+Dom.getViewportHeight())
					&& ((region.bottom-region.top) < xy[1])) {
				glossaryPopup.cfg.setProperty("context", [ element, YAHOO.widget.Overlay.BOTTOM_LEFT, YAHOO.widget.Overlay.TOP_LEFT ]);
			}

			// @todo: handle overflow to the right
		}
		lastAlignElement = element;
	},

	// The current term shown in overlay
	currentDescriptionKey = null,

	setDescriptionData = function(key) {
		;;; debug("setDescriptionData", key);
		if (currentDescriptionKey == key) {
			return;
		}
		var data = glossaryMap[key];
		// ;;; debug("setDescriptionData", key, data);
		try {
			setContent(descriptionHeader, data.term_display ? data.term_display : data.term);

			setContent(descriptionDescription, data.description);
			setContent(descriptionCategory, data.category ? data.category : "");
			if (data.descriptionExtra) {
				setContent(descriptionMore, data.moreText ? data.moreText : YAHOO.systime.glossary.MORE_TEXT);
				setContent(descriptionDescriptionExtra, data.descriptionExtra);
				Dom.setStyle(descriptionMore, "display", "block");
			} else {
				Dom.setStyle(descriptionMore, "display", "none");
			}
			Dom.setStyle(descriptionDescriptionExtra, "display", "none");

			glossaryPopup.element.className = glossaryPopup.element.defaultClassName;
			if (data.classname) {
				Dom.addClass(glossaryPopup.element, data.classname);
			}

			currentDescriptionKey = key;
		} catch (ex) {
			;;; debug(ex);
			;;; YAHOO.log(ex);
		}
	},

	isGlossaryTermElement = function(el) {
		;;; debug('el', el);
		return el && (el.nodeName.toLowerCase() == YAHOO.systime.glossary.ELEMENT_NAME)
			&& Dom.hasClass(el, YAHOO.systime.glossary.ELEMENT_CLASSNAME);
	},

	showDescriptionHandler = function(evt) {
		try {
			var key, region, target;

			target = Event.getTarget(evt);
			// allow for a single level of elements nested inside glossary term element
			if (target.parentNode && isGlossaryTermElement(target.parentNode) && target.parentNode.glossaryKey) {
				target = target.parentNode;
			}
			if (target && isGlossaryTermElement(target) && target.glossaryKey) {
				// Pointer over term element

				region = Dom.getRegion(target);
				key = target.glossaryKey;

				if ((key != lastShownKey) && glossaryMap[key]) {
					// setDescriptionData(term, glossaryMap[term]);
				}
				lastShownKey = key;
				descriptionTarget = target;

				setShowTimer();
			// } else if ((target == Dom.get("glossaryPopup")) || Dom.isAncestor("glossaryPopup", target)) {
			} else if ((target == glossaryPopup.element) || Dom.isAncestor(glossaryPopup.element, target)) {
				// Pointer over term description
				clearHideTimer();
			} else {
				// Neither over term or description
				clearShowTimer();
				setHideTimer();
				// hideDescription();
			}
		} catch (ex) {
			;;; debug(ex);
			;;; YAHOO.log(ex);
		}
	},

	createElement = function(name, classes, children) {
		try {
			var el, i;

			el = document.createElement(name);
			if (YAHOO.lang.isString(classes)) {
				Dom.addClass(el, classes);
			} else if (YAHOO.lang.isArray(classes)) {
				for (i = 0; i < classes.length; i++) {
					Dom.addClass(el, classes[i]);
				}
			}
			if (arguments.length > 2) {
				for (i = 2; i < arguments.length; i++) {
					if (YAHOO.lang.isString(arguments[i])) {
						el.innerHTML += arguments[i];
					} else {
						el.appendChild(arguments[i]);
					}
				}
			}
			return el;
		} catch (ex) {
			// ;;; debug(ex);
		}
	},

	createPageGlossaryDisplays = function() {
		var i, id, config, content, bd, list, term, description;

		try {
			if (!pageGlossaryDisplays) {
				return;
			}

		for (id in pageGlossaryDisplays) {
			if (pageGlossaryDisplays.hasOwnProperty(id)) {
				config = pageGlossaryDisplays[id];

				bd = createElement("div", [ "bd", "page-glossary-bd" ]);
				list = document.createElement("dl");
				for (i = 0; i < pageGlossary.length; i++) {
					term = createElement("dt", null, pageGlossary[i].term);
					description = createElement("dd", null, pageGlossary[i].description);
					list.appendChild(term);
					list.appendChild(description);
				}
				bd.appendChild(list);

				content = createElement("div", "page-glossary",
																createElement("div", [ "hd", "page-glossary-hd" ],
																							createElement("h1", "title", config.title)), bd);

				// ;;; debug(content);

				Dom.get(id).appendChild(content);
			}
		}
		} catch (ex) {
			// ;;; debug(ex);
		}
	},

	init = function() {
		var i, container, terms, overlayConfig;
		try {
			glossaryMap = {};
			// glossaryTerms = {};
			// glossaryTermsExtra = {};
			for (i = 0; i < pageGlossary.length; i++) {
				glossaryMap[pageGlossary[i].term_key] = pageGlossary[i];
				// glossaryTerms[pageGlossary[i].term] = pageGlossary[i].description;
				// glossaryTermsExtra[pageGlossary[i].term] = pageGlossary[i].descriptionExtra;
			}
			;;; debug({ pageGlossary: pageGlossary, glossaryTerms: glossaryTerms, glossaryTermsExtra: glossaryTermsExtra, glossaryMap: glossaryMap });

			createPageGlossaryDisplays();

			overlayConfig = {
				visible: false,
				close: false,
				width: "300px",
				draggable: false,
				constraintoviewport: true,
				preventcontextoverlap: true,
				zIndex: 1000,
				effect: {
					effect: YAHOO.widget.ContainerEffect.FADE,
					duration: YAHOO.systime.glossary.EFFECT_TIME/1000
				}
			};

			if (glossaryConfig.overlayConfig) {
				overlayConfig = YAHOO.lang.merge(overlayConfig, glossaryConfig.overlayConfig);
			}

			glossaryPopup = new YAHOO.widget.Panel("glossaryPopup", overlayConfig);

			descriptionHeader = createElement("div", "description-header");
			descriptionDescription = createElement("div", "description");
			descriptionCategory = createElement("div", "category");
			descriptionMore = createElement("div", "show-more");
			Event.on(descriptionMore, "click", YAHOO.systime.glossary.expandDescription);
			descriptionDescriptionExtra = createElement("div", [ "description", "extra" ]);

			glossaryPopup.setHeader(descriptionHeader);
			glossaryPopup.setBody(descriptionCategory);
			glossaryPopup.appendToBody(descriptionDescription);
			Dom.addClass(glossaryPopup.body, "clearfix");
			glossaryPopup.appendToBody(descriptionMore);
			glossaryPopup.appendToBody(descriptionDescriptionExtra);

			// setDescriptionData("", {});

			container = glossaryConfig.container ? glossaryConfig.container : document.body;
			glossaryPopup.render(container);

			glossaryPopup.element.defaultClassName = glossaryPopup.element.className;

			terms = Dom.getElementsByClassName(YAHOO.systime.glossary.ELEMENT_CLASSNAME, YAHOO.systime.glossary.ELEMENT_NAME);
			;;; debug("terms", terms);
			for (i = 0; i < terms.length; i++) {
				terms[i].glossaryKey = terms[i].title;
				if (terms[i].removeAttribute) {
					terms[i].removeAttribute("title");
				} else {
					terms[i].title = "";
				}
			}
			Event.on(document, "mouseover", showDescriptionHandler);
			// Event.on(terms, "mouseover", showDescription);
		} catch (ex) {
			YAHOO.log(ex);
			;;; debug(ex);
		}
	};

	YAHOO.systime.glossary.ELEMENT_NAME = "dfn";
	YAHOO.systime.glossary.ELEMENT_NAME = "span";
	YAHOO.systime.glossary.ELEMENT_CLASSNAME = "glossary-term";
	YAHOO.systime.glossary.SHOW_TIMEOUT = 500;
	YAHOO.systime.glossary.HIDE_TIMEOUT = 500;
	YAHOO.systime.glossary.EFFECT_TIME = 250;
	YAHOO.systime.glossary.MORE_TEXT = "More &#x2026;";
	YAHOO.systime.glossary.ACTIVE_TERM_CLASSNAME = "glossary-term-active";

	YAHOO.systime.glossary.createGlossary = function(glossary, config) {
		;;; debug("createGlossary", glossary, config);
		pageGlossary = glossary;
		glossaryConfig = config || {};
		// ;;; debug("pageGlossary", pageGlossary);
		Event.onDOMReady(init);
	}

	YAHOO.systime.glossary.addPageGlossary = function(id, config) {
		if (!pageGlossaryDisplays) {
			pageGlossaryDisplays = {};
		}
		pageGlossaryDisplays[id] = config;
	}

	YAHOO.systime.glossary.expandDescription = function() {
		;;; debug("YAHOO.systime.glossary.expandDescription");
		YAHOO.util.Dom.setStyle(descriptionDescriptionExtra, "display", "block");
		YAHOO.util.Dom.setStyle(descriptionMore, "display", "none");

		// Realign overlay by setting context to it's old value!
		//
		// The overlay must not change position, i.e. from above anchor to
		// below, as this will place the pointer outside the overlay and,
		// hence, hide the overlay
		glossaryPopup.cfg.setProperty("context", glossaryPopup.cfg.getProperty("context"));
	}
}());
