function getToken(sendResponse) {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
	sendResponse(token);
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    getToken(sendResponse)
    return true;
})
