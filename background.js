// Default max-age 6 months in seconds
var max_age = "15570000";

chrome.webRequest.onHeadersReceived.addListener(
	function(details) {
		var url = new URL(details.url);

		var json = localStorage[url.hostname];

		if (json != undefined && url.protocol === "https:") {
			var pins = JSON.parse(json); // The web server should return 1 pin. We need 2, the second is a backup key which needs to be outside the main keys certificate chain, which we don't have so we'll just add a fake one
			pins.push("AbpHGcgLb+kRsJGnwFEktk7uzpZOCcBY74+YBdrKVGs=");

			var header = "";

			for (var i = 0; i < pins.length; i++) {
				header += "pin-sha256=\"" + pins[i] + "\"; ";
			}

			header += "max-age=" + max_age;
			console.log(header);

			details.responseHeaders.push({
				"name": "Public-Key-Pins",
				"value": header
			});

			delete localStorage[url.hostname];
		}

		return { responseHeaders: details.responseHeaders };
	},
	{
		urls: ["https://*/*"],
		types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
	},
	["blocking", "responseHeaders" ]
);
