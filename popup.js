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
			
			var json = JSON.parse(req.responseText);
			
			document.getElementById("hostpinbox").value = json[0];
			document.getElementById("rootpinbox").value = json[1];
		});
	}, false);
	
	var addButton = document.getElementById("add");
	addButton.addEventListener("click", function() {
		chrome.tabs.getSelected(null, function(tab) {
			var pin1 = document.getElementById("hostpinbox").value;
			var pin2 = document.getElementById("rootpinbox").value;

			var host = document.getElementById("hostbox").value;
			
			var pins = [ pin1, pin2 ];
			
			localStorage[host] = JSON.stringify(pins);
			chrome.tabs.reload(tab.id, null, function() {} );
			
			document.write("Complete!");
		});
	}, false);
}, false);
