function makeLi(url) {
	var li = document.createElement("li");
	var span = document.createElement("span");
	var btn = document.createElement("button");
	
	span.appendChild(document.createTextNode(url));
	btn.appendChild(document.createTextNode("X"));
	li.appendChild(span);
	li.appendChild(btn);
	
	btn.addEventListener("click", removeLi);
	
	return li;
}

function removeLi(e) {
	e.target.parentNode.remove();
	saveOptions(e);
}

function saveOptions(e) {
	e.preventDefault();
	
	var url = document.querySelector("#url");
	
	if (url.value !== "") {
		document.querySelector("#url-list").appendChild( makeLi(url.value) );
		url.value = "";
	}
	
	var urls = Array
		.from(document.querySelectorAll("#url-list li span"))
		.map(li => li.textContent);

	browser.storage.local.set({
		urls: urls
	});

}

function restoreOptions() {
	function updateList(result) {
		if (!result.urls) {
			return;
		}

		for (var url of result.urls) {
			urlList.appendChild(makeLi(url));
		}
	}

	function onError(err) {
		console.log(`Error: ${err}`);
	}

	var urlList = document.querySelector("#url-list");
	var getUrls = browser.storage.local.get("urls");
	getUrls.then(updateList, onError);
	
	/*updateList({
		urls: ["*://*.google.it", "*://*.google.it", "*://*.google.it"]
	});*/
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#add-url-form").addEventListener("submit", saveOptions);
