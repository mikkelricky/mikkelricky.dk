(function() {
	YAHOO.namespace("systime.widget");

	YAHOO.systime.widget.PopupLinks = function(config) {
		;;; debug("YAHOO.systime.widget.PopupLinks.new");
		this.config = config;
		YAHOO.util.Event.onDOMReady(this.init, this, true);
  }

	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event, Connect = YAHOO.util.Connect,
	debug = function() {
		if ((typeof(console) != "undefined") && (typeof(console.debug) == "function")) {
			console.debug.apply(console, arguments);
		}
	},

	buildUrl = function(url, params) {
		var p, tokens, query;
		// Split url into actual url and fragment identifier
		if (params) {
			tokens = url.split('#', 2);
			query = [];
			for (p in params) if (params.hasOwnProperty(p)) {
				query.push(encodeURIComponent(p)+'='+encodeURIComponent(params[p]));
			}
			url = tokens[0];
			url += ((url.indexOf('?') > -1) ? '&' : '?')+query.join('&');
/*
			if (tokens.length > 1) {
					url += '#'+tokens[1];
			}
*/
		}
		return url;
	},

  DEFAULT_CONFIG = {
		popupLinkElementName: "a",
		popupLinkClassname: "popup-link",

		containerEl: null,

		overlayConfig: {
			visible: false,
			// close: false,
			width: "400px",
			// height: "150px",
			autofillheight: "body", // default value, specified here to highlight its use in the example
			// draggable: false,
			constraintoviewport: true,
			preventcontextoverlap: true,
			zIndex: 1000
		},

		lang: {
			"da": {
				"Loading...": "Henter indhold..."
			}
		}
	},

	// @TODO implement real, recursive merge
	merge = function() {
		var i, p, o, merged = {};
		for (i = 0; i < arguments.length; i++) {
			o = arguments[i];
			if (YAHOO.lang.isObject(o)) {
				for (p in o) if (YAHOO.lang.hasOwnProperty(o, p)) {
					if (YAHOO.lang.isObject(o[p])) {
						if (YAHOO.lang.hasOwnProperty(merged, p)) {
							merged[p] = merge(merged[p], o[p]);
						} else {
							merged[p] = merge(o[p]);
						}
					} else {
						merged[p] = o[p];
					}
				}
			}
		}
		return merged;
	},

	PopupLinks = YAHOO.systime.widget.PopupLinks;

	PopupLinks.prototype = {
		init: function() {
			try {
				// Fix some config
				this.config.containerEl || (this.config.containerEl = document.body);
				// Handle TYPO3 Danish locale
				if (this.config.locale == "dk") {
					this.config.locale == "da";
				}

				;;; debug("PopupLinks.init", this);
				;;; debug("config", this.config);
				this.config = merge(DEFAULT_CONFIG, this.config);
				;;; debug("config", this.config);

				this.overlayId = "contentPopup";

				this.contentPopup = new YAHOO.widget.Panel(this.overlayId, this.config.overlayConfig);
				this.setPopupContent({ header: "", body: this.translate("Loading...") });
				this.contentPopup.render(this.config.containerEl);

				if (YAHOO.util.Resize) {
					// @see http://developer.yahoo.com/yui/examples/container/panel-resize.html
					var resize = new YAHOO.util.Resize(this.overlayId, {
						handles: [ "br" ],
						autoRatio: false,
						minWidth: 300,
						minHeight: 100,
						status: false
					});

					resize.on("startResize", function(args) {
     				if (this.cfg.getProperty("constraintoviewport")) {
							var clientRegion = Dom.getClientRegion(),
								elRegion = Dom.getRegion(this.element);

							resize.set("maxWidth", clientRegion.right - elRegion.left - YAHOO.widget.Overlay.VIEWPORT_OFFSET);
							resize.set("maxHeight", clientRegion.bottom - elRegion.top - YAHOO.widget.Overlay.VIEWPORT_OFFSET);
						} else {
							resize.set("maxWidth", null);
							resize.set("maxHeight", null);
						}

					}, this.contentPopup, true);

					resize.on("resize", function(args) {
						var panelHeight = args.height;
						this.cfg.setProperty("height", panelHeight + "px");
					}, this.contentPopup, true);
				}

				this.popupLinks = Dom.getElementsByClassName(this.config.popupLinkClassname, this.config.popupLinkElementName, this.config.containerEl);
				Event.on(this.popupLinks, "click", this.showPopup, this, true);
				;;; debug("popupLinks", this.popupLinks);
			} catch (ex) {
				YAHOO.log(ex);
				;;; debug(ex);
			}
		},

		translate: function(text) {
			if (this.config.locale && this.config.lang[this.config.locale] && this.config.lang[this.config.locale][text]) {
				return this.config.lang[this.config.locale][text];
			}
			return text;
		},

		contentPopup: null,
		contentConnection: null,
		contentCache: {},

		setPopupContent: function(data) {
			// if (data.header)
			{
				this.contentPopup.setHeader(data.header);
			}
			// if (data.body)
			{
				this.contentPopup.setBody(data.body);
			}
		},

		abortCallback: {
			success: function(o) {
				;;; debug("abort.success", o);
				this.contentConnection = null;
			},
			failure: function(o) {
				;;; debug("abort.failure", o);
				this.contentConnection = null;
			}
		},

		/**
	 * @param string url
	 * @param object query
   */
		showPopup: function(evt) {
			try {
				;;; debug("showPopup", this);
				var
				target = Event.getTarget(evt),
				href = Dom.getAttribute(target, "href"),
				matches = new RegExp("#c([0-9]+)").exec(href),
				contentId = matches ? matches[1] : null,
				params = this.config.contentUrlParams ? this.config.contentUrlParams: {},
				contentUrl, callback
				;

				if (contentId > 0) {
					;;; debug(href, contentId);
					Event.stopEvent(evt);


					// var region = Dom.getRegion(this);
					// this.contentPopup.cfg.setProperty("x", region.left);
					// this.contentPopup.cfg.setProperty("y", region.bottom);

					if (this.contentConnection && Connect.isCallInProgress(this.contentConnection)) {
						Connect.abort(this.contentConnection, abortCallback, false);
					}

					if (contentId > 0) {
						params.contentId = contentId;
					}
					contentUrl = buildUrl(href, params);

					// prompt("contentUrl", contentUrl);

					if (this.contentCache[contentUrl]) {
						;;; debug("cache hit", contentUrl);
						this.setPopupContent(this.contentCache[contentUrl]);
					} else {
						this.setPopupContent({ header: "", body: this.translate("Loading...") });

						callback = {
							success: function(o) {
								var result;
								try {
									result = YAHOO.lang.JSON.parse(o.responseText);
									;;; debug("success", result, o);

									this.contentCache[o.argument[0]] = result;

									this.setPopupContent(result);
								} catch (ex) {
									;;; debug(ex);
								}

								this.contentConnection = null;
							},
							failure: function(o) {
								;;; debug("failure", o);
								this.contentConnection = null;
							},
							scope: this,
							argument: [ contentUrl ]
						};

						// @TODO cache response
						this.contentConnection = Connect.asyncRequest("GET", contentUrl, callback);
					}
					this.contentPopup.cfg.setProperty("context", [ target, "tl", "bl" ]);
					this.contentPopup.align()
					this.contentPopup.show();
				}
			} catch (ex) {
				;;; alert(ex);
			}
		}
	}
}());
