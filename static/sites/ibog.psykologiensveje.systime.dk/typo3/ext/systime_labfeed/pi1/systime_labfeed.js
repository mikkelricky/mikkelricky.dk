YAHOO.namespace("systime");

(function() {
	var debug = function() {
		if ((typeof(console) != "undefined") && (typeof(console.debug) == "function")) {
			console.debug.apply(console, arguments);
		}
	},

		today, yesterday,

		formatPostDate = function(pubDate) {
		if (!today) {
			today = new Date();
			today.setHours(0);
			today.setMinutes(0);
			today.setSeconds(0);

			yesterday = new Date(today.getTime()-24*60*60*1000);
		}

		if (typeof(pubDate) == "string") {
			pubDate = new Date(pubDate);
		}

		if (today.getTime() < pubDate.getTime()) {
			// pubDate = "I dag";
			return YAHOO.util.Date.format(pubDate, { format: "%H:%m"}, "da");
		} else if (yesterday.getTime() < pubDate.getTime()) {
			return "I g&aring;r";
			// pubDate = YAHOO.util.Date.format(pubDate, { format: "%T"}, "da");
		} else {
			// pubDate = YAHOO.util.Date.format(pubDate, { format: "%a %e. %b"}, "da");
			return YAHOO.util.Date.format(pubDate, { format: "%e/%m"}, "da");
		}
		},

	getExcerpt = function(text, length) {
		if (length < text.length) {
			while ((length > 0) && !/\s/.test(text.charAt(length))) {
				length--;
			}
			if (length > 0) {
				text = text.substring(0, length)+" &#x2026;";
			}
		}
		return text;
	}

	YAHOO.systime.LabFeed = function(el, config) {
		var el = YAHOO.util.Dom.get(el);
		if (el) {
			YAHOO.util.DateLocale["da"] = YAHOO.lang.merge(YAHOO.util.DateLocale, {
					a: [ "man", "tirs", "ons", "tors", "fre", "l&oslash;r", "s&oslash;n" ],
					A: [ "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "l&oslash;rdag", "s&oslash;ndag" ],
					b: [ "jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec" ],
					B: [ "januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december" ],
					c: "%a %d %b %Y %T %Z",
					p: ["", ""],
					P: ["", ""],
					x: "%d.%m.%Y",
					X: "%T"
				});

			if (!config.excerptLength) {
				config.excerptLength = 60;
			}

			if (config.proxyUrl) {
				// Systimes server redirect setup is f... up! Thus, we cannot rely on certain server variables ...
				var match = new RegExp("([a-z]+://)([^.]+\.)([^.]+\.systime\.dk/)").exec(document.location);
				if (match) {
					config.proxyUrl = config.proxyUrl.replace(match[1]+match[3], match[0]);
				}
			}

			try {
				var ds = new YAHOO.util.DataSource(config.proxyUrl+"?");
				ds.responseType = YAHOO.util.DataSource.TYPE_XML;
				ds.responseSchema = {
					resultNode: "item",
					fields: [ "pubDate", "title", "link", "description", "category", "lab-subjects" ],

					metaNode: "channel",
					metaFields: [ "title" ]
				};

				var query = "url="+config.url;
				var maxPostCount = config.numberOfPosts ? parseInt(config.numberOfPosts) : 1000;
				ds.sendRequest(query, {
						success: function(payload, response) {
							var count = 0,
								itemsStart = "<ol class='items'>",
								itemsEnd = "</"+"ol>",
								itemStart = "<li class='item'>",
								itemEnd = "</"+"li>";
							if (YAHOO.env.ua.ie) {
								itemsStart = "<div class='items'>",
								itemsEnd = "</"+"div>",
								itemStart = "<div class='item'>",
								itemEnd = "</"+"div>";
							}

							var xml = "";
							xml += itemsStart;
							// xml += "<div class='items'>";
							for (var i = 0; response.results[i]; i++) {
								if (++count > maxPostCount) {
									break;
								}
								var item = response.results[i];
								var pubDate = formatPostDate(item.pubDate);

								xml += itemStart;
								xml += "<a target='_blank' href='"+item.link+"'>"
									+"<span class='time'>"+pubDate+"<"+"/span>";
								if (config.showSubjects) {
									xml += " ";
									if (item["lab-subjects"]) {
										xml += "<span class='subjects'>"+item["lab-subjects"]+"<"+"/span>";
									} else if (item["category"]) {
										xml += "<span class='subjects'>"+item["category"]+"<"+"/span>";
									}
									xml += " ";
								}
								xml += "<span class='title'>"+item.title+"<"+"/span>"
									+" "
									+"<span class='description'>"+getExcerpt(item.description, config.excerptLength)+"<"+"/span>"
									+"<"+"/a>";
								xml += itemEnd;
							}
							xml += itemsEnd;

							el.innerHTML = xml;
						},
						failure: function(request, response, payload) {
							el.innerHTML = "";
						}
					});
			} catch(ex) {
				;;; debug(ex);
			}
		}
	}
}());
