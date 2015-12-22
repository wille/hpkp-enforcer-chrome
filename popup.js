function geturl(host) {
	return "https://redpois0n.com/getpin.php?url=" + host;
}

document.addEventListener("DOMContentLoaded", function() {	
	chrome.tabs.getSelected(null, function(tab) {
		var x = document.createElement("a");
		x.href = tab.url;
		document.getElementById("hostbox").value = x.hostname;
	});
	
	var loadButton = document.getElementById("load");
	loadButton.addEventListener("click", function() {
		chrome.tabs.getSelected(null, function(tab) {
			var x = document.createElement("a");
			x.href = tab.url;
								
			var req = new XMLHttpRequest();
			req.open("GET", geturl(x.hostname), false);
			req.send(null);
			document.getElementById("pinbox").value = req.responseText;
		});
	}, false);
	
	var addButton = document.getElementById("add");
	addButton.addEventListener("click", function() {
		chrome.tabs.getSelected(null, function(tab) {
			var pin = document.getElementById("pinbox").value;
			var host = document.getElementById("hostbox").value;
				
			localStorage[host] = pin;
			chrome.tabs.reload(tab.id, null, function() {} );
			
			document.write("Complete!");
		});
	}, false);
}, false);
