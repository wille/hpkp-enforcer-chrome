var grabber_url = "https://redpois0n.com/pin.php";

document.addEventListener("DOMContentLoaded", function() {
	var checkPageButton = document.getElementById("addpage");
	checkPageButton.addEventListener("click", function() {
		chrome.tabs.getSelected(null, function(tab) {
			var form = document.createElement("form");
			form.action = grabber_url;
			form.method = "post";
			var i = document.createElement("input");
			i.type = "hidden";
			i.name = "url";
			i.value = tab.url;
			form.appendChild(i);
			document.body.appendChild(form);
			form.submit();
		});
	}, false);
}, false);