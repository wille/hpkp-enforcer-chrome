var ignore = [

];

chrome.webRequest.onHeadersReceived.addListener(
	function(details) {
		var url = new URL(details.url);
	
		if (ignore.indexOf(url.hostname) > -1) {
			return { };
		}
		
		if (url.protocol === "https:") {
			for (var i = 0; i < details.responseHeaders.length; i++) {
				if (details.responseHeaders[i].name.toLowerCase() === "public-key-pins")
				return { };
			}
			
			var header = "";

			details.responseHeaders.push({
				"name": "Public-Key-Pins",
				"value": header
			});
		}

		return { responseHeaders: details.responseHeaders };
	},
	{
		urls: ["https://*/*"],
		types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
	},
	["blocking", "responseHeaders" ]
);
