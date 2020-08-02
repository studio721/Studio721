function getVideosByKeywords(keywords, sendResponse) {
	$.ajax({
		type: 'GET',
		url: 'https://www.googleapis.com/youtube/v3/search',
		headers: {
			Authorization: 'Bearer ' + authorization_token,
		},
		data: {
			key: credentials['api_key'],
			q: keywords,
			part: 'snippet',
			maxResults: 10,
			type: 'video',
			videoEmbeddable: true,
		},
		success: response => sendResponse(response.items),
		error: xhr => {
			console.log("Error retrieving YouTube videos\n" + 
				xhr.responseText);
			sendResponse();
		}
	});
}
