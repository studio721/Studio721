const credentialsFile = chrome.runtime.getURL('/credentials.json');
var credentials;

fetch(credentialsFile)
    .then(response => response.json())
    .then((json) => {
	credentials = json;
	});

