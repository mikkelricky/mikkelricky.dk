(function() {
	var

	implodeAttributes = function(attributes) {
		var name, tokens = [];
		for (name in attributes) {
			if (attributes.hasOwnProperty(name)) {
				tokens.push(name+"="+attributes[name]);
			}
		}
		return tokens.join(',');
	},

	defaultPopupAttributes = {
		status: "no",
		toolbar: "no",
		location: "no"
	},

	openPopup = function(url, attributes, name, errorMessage) {
		var params, popup;
		params = implodeAttributes(YAHOO.lang.merge(defaultPopupAttributes, attributes));
		popup = window.open(url, name, params);
		if (!popup) {
			alert(errorMessage ? errorMessage : "Cannot open pop-up window. Do you use a pop-up blocker?");
		} else {
			popup.focus();
		}
	}

	YAHOO.namespace("systime.mat");
	YAHOO.systime.mat.openPopup = openPopup;
}());

(function() {
	var
	errorMessage = "Kan ikke åbne pop-up. Har du installeret en pop-up-blokker?",
	buttons = [
		{ button: [ "systime-button-calculator", "systime-button-calculator-float" ],
			windowname: "sysmatcalculator",
			url: "http://bogwebs.systime.dk/mathweb12/LRC/lommeregnerC.html?,0,0,0,0,0,0,0",
			attributes: { width: 345, height: 405 }
		},
		{ button: [ "systime-button-graph", "systime-button-graph-float" ],
			windowname: "sysmatgraph",
			url: "http://bogwebs.systime.dk/mathweb12/GTC/grafTegnerC.html?-10,10,-10,10,1,0,0,0,,,,,,1,1",
			attributes: { width: 762, height: 493 }
		}
	];

	YAHOO.util.Event.onDOMReady(function() {
		var i, j, els, info;
		for (i = 0; i < buttons.length; i++) {
			info = buttons[i];
			els = YAHOO.util.Dom.get(YAHOO.lang.isArray(info.button) ? info.button : [ info.button]);
			if (els) {
				YAHOO.util.Event.on(els, "click", function(evt, info) {
					YAHOO.systime.mat.openPopup(info.url, info.attributes, info.windowname, errorMessage);
				}, info);
			}
		}
	});
}());
