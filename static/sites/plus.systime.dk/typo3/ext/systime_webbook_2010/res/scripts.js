(function() {
	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event,
	debug = function() {
		return;
		if ((typeof(console) != "undefined") && (typeof(console.debug) == "function")) {
			console.debug.apply(console, arguments);
			YAHOO.log(arguments);
		}
	},

	elementsHaveBeenFixed = false,
	tocHeight = false,

	fixElements = function() {
		if (!elementsHaveBeenFixed) {
			var logoRegion = Dom.getRegion("logo"),
				tocRegion = Dom.getRegion("toc-container"),
				leftRegion = Dom.getRegion("content-left"),
				marginTop = logoRegion.bottom-tocRegion.top,
				panel, region;

			// Make main content area at least as high as left area BEFORE resize
			// Dom.setStyle("book-page", "min-height", Dom.getRegion("content-left").height+"px");
			// ;;; debug("content-left", Dom.getRegion("content-left"));

			// ;;; debug("logoRegion", logoRegion.bottom);
			// ;;; debug("tocRegion", tocRegion);

			// Pull #toc down below #logo if not already below. Note: assumes #toc-container.margin-top == 0
			if (marginTop > 0) {
				Dom.setStyle("toc-container", "margin-top", marginTop+"px");
			}

			// set width of floating panel
			// panel = Dom.get("page-controls-float");
			// region = Dom.getRegion("page-content");
			// Dom.setStyle(panel, "width", region.width+"px");

			Dom.setStyle(panel, "margin-left", Dom.getStyle("page-content", "margin-left"));

			// Fix width of toc as it will have position "fixed" when scrolling
			tocRegion = Dom.getRegion("toc");
			Dom.setStyle("toc-lining", "width", tocRegion.width+"px");

			;;; debug("fixElements", tocRegion);
			elementsHaveBeenFixed = true;
		}
	},

	resizeTOC = function() {
		var region,
			tocRegion = Dom.getRegion("toc"),
			tocHdRegion = Dom.getRegion("toc-hd"),
			tocFtRegion = Dom.getRegion("toc-ft"),
			ftRegion = Dom.getRegion("ft"),
			viewportHeight = Dom.getViewportHeight(),
			clientRegion = Dom.getClientRegion(),
			scrollTop = Dom.getDocumentScrollTop(),
			maxHeight = viewportHeight-tocRegion.top+scrollTop;

		// If #ft is (partially) on screen make room for footer below toc
		region = clientRegion.intersect(ftRegion);
		if (region) {
			// ;;; debug("intersect", region);
			maxHeight -= region.height;
		}

		// Set #toc.max-height if #toc overflows viewport
		// if (tocRegion.bottom > viewportHeight)
		{
			if (tocHdRegion) {
				maxHeight -= tocHdRegion.height;
			}
			if (tocFtRegion) {
				maxHeight -= tocFtRegion.height;
			}

			if (maxHeight < 100) {
				maxHeight = 100;
			}

			;;; debug("resizeTOC", "maxHeight", maxHeight);

			Dom.setStyle("toc-content", "max-height", maxHeight+"px");
		}
	},

	panelAnimation,

	/**
	* @param boolean show to show or not to show
	*/
	showFloatingPanel = function(show) {
		var panel = Dom.get("page-controls-float"),
			panelRegion = Dom.getRegion(panel),
			// Should animation start or not
			animate = false,
			attributes, panelTop;

		if (!panel) {
			return;
		}

		// debug("viewport.width", Dom.getViewportWidth());
		// debug("#book.region", Dom.getRegion("book"));
		Dom.setStyle(panel, "right", (Dom.getViewportWidth()-Dom.getRegion("book").right)+"px");

		if (YAHOO.util.Anim) {
			attributes = {
	      top: { from: show ? -panelRegion.height : 0,
							 to: show ? 0 : -panelRegion.height }
	    };

			if (panelAnimation && panelAnimation.isAnimated() && ((show && (panelAnimation.attributes.top.from < panelAnimation.attributes.top.to))
																														|| (!show && (panelAnimation.attributes.top.from > panelAnimation.attributes.top.to)))) {
				// Let animation finish
			} else if (panelAnimation && panelAnimation.isAnimated() && ((!show && (panelAnimation.attributes.top.from < panelAnimation.attributes.top.to))
																																	 || (show && (panelAnimation.attributes.top.from > panelAnimation.attributes.top.to)))) {
				// Animation is running, but in the wrong direction
				panelAnimation.stop();
				attributes.top.from = panelAnimation.getAttribute("top");
				animate = true;
			} else {
				// re-animate
				animate = true;
			}

			panelTop = parseInt(Dom.getStyle(panel, "top"));
			if ((show && (panelTop >= 0)) || (!show && panelTop <= attributes.top.to)) {
				// Panel already on screen => No animation needed
				animate = false;
			}

			if (animate) {
				if (panelAnimation && panelAnimation.isAnimated()) {
					// This should never happen ...
					panelAnimation.stop();
				}
				if (!panelAnimation) {
					panelAnimation = new YAHOO.util.Anim(panel, attributes, .25, YAHOO.util.Easing.easeOut);
				} else {
					// Reuse animation instance
					panelAnimation.init(panel, attributes, .25, YAHOO.util.Easing.easeOut);
				}
				panelAnimation.animate();
			}
		} else {
			Dom.setStyle(panel, "top", (show ? 0 : -1000)+"px");
		}
	},

	scrollTOC = function(animate) {
		var container = Dom.get("toc-content"),
			containerRegion = Dom.getRegion(container),
			el = Dom.get("toc-current"),
			elRegion = Dom.getRegion(el),
			ancestor, ancestorRegion,
			attributes, animation;
		if (container && el) {
			if (!containerRegion.contains(elRegion)) {
				ancestor = el;
				ancestorRegion = Dom.getRegion(ancestor);
				while (ancestor && (elRegion.bottom-Dom.getRegion(ancestor).top < containerRegion.height)) {
					ancestorRegion = Dom.getRegion(ancestor);
					ancestor = Dom.getAncestorByTagName(ancestor, "li");
				}

				if (animate && YAHOO.util.Anim) {
					attributes = {
						scroll: {
							to: [ 0, ancestorRegion.top-containerRegion.top ]
						}
					}
					animation = new YAHOO.util.Scroll(container, attributes, .5, YAHOO.util.Easing.easeOut);
					animation.animate();
				} else {
					container.scrollTop = ancestorRegion.top-containerRegion.top;
				}
			}
		}
	};

	Event.onDOMReady(function() {
		try {
			fixElements();

			// Make main content area at least as high as left area BEFORE resize
			Dom.setStyle("book-page", "min-height", Dom.getRegion("content-left").height+"px");
			;;; debug("content-left", Dom.getRegion("content-left"));

			resizeTOC();

			// Make book page (at least) as high as page. Important: must be
			// done after toc has been resized on page load
			// var bdRegion = Dom.getRegion("bd");
			// Dom.setStyle("book-page", "min-height", bdRegion.height+"px");



			// Scroll current toc item into view if not visible
			// "scrollIntoView" cannot be used as it's confused by the floating toc ...
			// The goal is to make #toc-current visible plus as many ancestors that can fit into #toc-content view port

			scrollTOC();
		} catch (ex) {
			;;; debug(ex);
		}
	});

	Event.on(window, "resize", function() {
		resizeTOC();
		// scrollTOC();
	});

	Event.on(window, "scroll", function(evt) {
		// onscroll is called on page load
		fixElements();
		;;; debug("scroll");
		var scrollTop = Dom.getDocumentScrollTop(),
			panelRegion = Dom.getRegion("systime-buttonpanel"),
			logoRegion = Dom.getRegion("logo"),
			menuRegion = Dom.getRegion("menu"),
			bdRegion = Dom.getRegion("bd"),
			clientRegion = Dom.getClientRegion();

		showFloatingPanel(scrollTop >= panelRegion.top);

		// Tyvstjålet fra http://store.apple.com/dk/configure/MC238DK/A?mco=MTM5Mjg3Njk
		if (clientRegion.intersect(logoRegion) || clientRegion.intersect(menuRegion)) {
			Dom.replaceClass("toc-container", "floating", "pinned_top");
		} else {
			Dom.replaceClass("toc-container", "pinned_top", "floating");
		}
		resizeTOC();

	});
}());


(function() {
	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event,
	debug = function() {
		// return;
		if ((typeof(console) != "undefined") && (typeof(console.debug) == "function")) {
			console.debug.apply(console, arguments);
			YAHOO.log(arguments);
		}
	},

	printPage = function() {
		window.print();
	},

	toggleConcentrateMask = function() {
		;;; debug("toggleConcentrateMask");
		YAHOO.systime.concentrate.toggleMask();
	}
	;

	Event.onDOMReady(function() {
		Event.on([ "systime-button-print", "systime-button-print-float" ], "click", printPage);
		Event.on([ "systime-button-concentrate", "systime-button-concentrate-float" ], "click", toggleConcentrateMask);
	});
}());
