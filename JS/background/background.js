var authorization_token;
chrome.identity.getAuthToken({interactive: true}, function(token) {
	authorization_token = token;
	console.log(token);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (typeof request.message_type !== 'undefined') {
		switch (request.message_type) {
			case 'getVideosByKeywords':
				getVideosByKeywords(request.keywords, sendResponse);
				break;
			default:
				console.log("Unknown message type.");
				break;
		}
	} else {
		console.log("Unknown message received.");
	}
    return true;
})
