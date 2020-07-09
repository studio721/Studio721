var id;

setInterval(function() {
    chrome.tabs.getSelected(null, function(tab) {
        id = tab.id
     })

    chrome.tabs.sendMessage(id,{sendMessage:false, data:""})
clicked = true;
},  300);


chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.getSelected(null, function(tab) {
        id = tab.id
     })
    chrome.tabs.sendMessage(id,{sendMessage:true, data:"youtube:https://youtube.com/watch?v=fx2Z5ZD_Rbo"})
})