var ignore = [

];

function post() {
	post("https://report-uri.io/#", { "url": url });
}

function post(path, params) {
	var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", path);

    for (var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

// Default max-age 6 months in seconds
var max_age = "15570000";

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
			
			var header = "max-age=" + max_age;

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
