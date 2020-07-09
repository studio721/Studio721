chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse){

    if(message.sendMessage){
        sendMessage(message.data)
    }

    if(document.querySelectorAll('[aria-label="Send a message to everyone"]').length == 0){
        document.querySelectorAll("[data-tooltip]")[4].click()
        document.querySelector('[aria-label="Close"]').style.display = "none"
    }

    const elements = document.querySelectorAll("[data-message-text]");
    element = document.querySelector('textarea');
    for(element of elements){
        let inner = element.innerHTML
        if(inner.includes("youtube:")){
            var changable =  element.innerHTML;
            var content =  String(changable.substring(changable.indexOf("youtube:")));
            alert("Play a youtube video here " + String(changable.replace("youtube:","")))
            element.parentElement.children.length > 1  ?   element.remove():   element.parentElement.parentElement.remove();
        }        
    }
}


var element = document.createElement('h1');
element.innerHTML = "hello"
element.style.color = "white";
element.style.fontSize = "30px";
document.querySelector(".eFmLfc").appendChild(element);  

function sendMessage(message){
    var button = document.querySelectorAll("[aria-label='Send a message to everyone']")[1]
    document.querySelector("textarea").value = message;
    button.classList.remove(button.classList[button.classList.length-1])
    button.setAttribute("aria-disabled","false")
    button.click()
}