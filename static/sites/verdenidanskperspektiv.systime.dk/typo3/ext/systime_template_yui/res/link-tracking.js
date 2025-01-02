(function() {
	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event,

	debug = function() {
		if ((typeof(console) != "undefined") && (typeof(console.debug) == "function")) {
			console.debug.apply(console, arguments);
		}
	}

	init = function() {
		Dom.getElementsBy(function(el) { return true; }, "a", null, function(a) {
			var title = Dom.getAttribute(a, "title"),
				href = Dom.getAttribute(a, "href"),
				regexp = /^ga:([a-z0-9-]+)/,
				matches = regexp.exec(title),
				trackingId = matches ? matches[1] : null,
				trackingUrl;

			if (trackingId && href) {
				var trackingUrl = href.replace(/https?:\/\//, '');
				;;; debug("/link/"+trackingId+"/"+trackingUrl);

				Event.on(a, "click", function(evt) {
					;;; debug("/link/"+trackingId+"/"+trackingUrl);
					pageTracker._trackPageview("/link/"+trackingId+"/"+trackingUrl);
				});
			}

			if (title) {
				// Trim element title
				a.title = title.replace(regexp, '').replace(/^\s+/, '');
			}
		});
	}

	Event.onDOMReady(function() {
		if (typeof(pageTracker) != "undefined") {
			init();
		}
	});
}());
