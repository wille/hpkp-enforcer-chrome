function geturl(host) {
	return "https://redpois0n.com/pin.php?url=" + host;
}

document.addEventListener("DOMContentLoaded", function() {	
	
	var loadButton = document.getElementById("load");
	loadButton.addEventListener("click", function() {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.getSelected(null, function(tab) {
				var x = document.createElement("a");
				x.href = tab.url;
				
				document.getElementById("hostbox").value = x.hostname;
				
				var req = new XMLHttpRequest();
				req.open("GET", geturl(x.hostname), false);
				req.send(null);
				document.getElementById("pinbox").value = req.responseText;
			});
		});
	}, false);
	
	var addButton = document.getElementById("add");
	addButton.addEventListener("click", function() {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.getSelected(null, function(tab) {
				var x = document.createElement("a");
				x.href = tab.url;
				
				var req = new XMLHttpRequest();
				req.open("GET", geturl(x.hostname), false);
				req.send(null);
				document.getElementById("pinbox").value = req.responseText;
			});
		});
	}, false);
}, false);