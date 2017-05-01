function onOptionsReadyOrUpdate(result/*, areaName = "local"*/) {
	if (!result.urls) {
		return;
	}
	
	var urls = result.urls.newValue || result.urls;

	browser.webRequest.onCompleted.removeListener(resetContextMenu);
	browser.webRequest.onCompleted.addListener(
		resetContextMenu,
		{ urls: urls }
	);
	
	// instantly apply script on matching tabs
	browser.tabs.query({
		url: urls
	}).then(resetContextMenuTabs);
}

function resetContextMenuTabs(tabs) {
	tabs.forEach(resetContextMenu);
}

function resetContextMenu(details) {
	// console.log(`[resetContextMenu] Executing script at ${details.url}`);*/
	browser.tabs.executeScript(
		details.id || details.tabId,
		{ code: "document.oncontextmenu = null", runAt: "document_end" }
	);
}

browser.storage.local.get("urls").then(onOptionsReadyOrUpdate);
browser.storage.onChanged.addListener(onOptionsReadyOrUpdate);

console.log('[rs] Running');