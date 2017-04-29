function onOptionsReadyOrUpdate(result/*, areaName = "local"*/) {
	if (!result.urls) {
		return;
	}
	
	browser.webRequest.onCompleted.removeListener(resetContextMenu);
	browser.webRequest.onCompleted.addListener(
		resetContextMenu,
		{ urls: result.urls.newValue || result.urls }
	);
}

function resetContextMenu(details) {
	// console.log(`[resetContextMenu] Executing script at ${details.url}`);*/
	browser.tabs.executeScript(
		details.tabId,
		{ code: "document.oncontextmenu = null", runAt: "document_end" }
	);
}

browser.storage.local.get("urls").then(onOptionsReadyOrUpdate);
browser.storage.onChanged.addListener(onOptionsReadyOrUpdate);
