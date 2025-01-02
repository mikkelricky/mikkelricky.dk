(function() {
	var Dom = YAHOO.util.Dom,

	adjustLabels = function(dl) {
		var i, prev,
		maxWidth = 0,
		terms = dl.getElementsByTagName('dt'),
		descriptions = dl.getElementsByTagName('dd');
		for (i = 0; i < terms.length; i++) {
			width = Dom.getRegion(terms[i]).width;
			if (width > maxWidth) {
				maxWidth = width;
			}
		}
		for (i = 0; i < terms.length; i++) {
			Dom.setStyle(terms[i], 'min-width', maxWidth+'px');
		}
		// Handle multiple "definitions"
		for (i = 0; i < descriptions.length; i++) {
			prev = Dom.getPreviousSibling(descriptions[i]);
			if (prev && (prev.nodeName.toLowerCase() == 'dd')) {
				Dom.setStyle(descriptions[i], 'padding-left', maxWidth+'px');
			}
		}
	}

	fixDialogs = function() {
		Dom.getElementsByClassName('systime-dialogue', 'div', 'content', function(el) {
			var i, lists;
			lists = el.getElementsByTagName('dl');
			for (i = 0; i < lists.length; i++) {
				adjustLabels(lists[i]);
			}
		});
		Dom.getElementsByClassName('dialogue', 'dl', 'content', function(el) {
			adjustLabels(el);
		});
	};

	YAHOO.util.Event.onDOMReady(fixDialogs);
}());
