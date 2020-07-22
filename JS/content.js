// chrome.runtime.onMessage.addListener(gotMessage);
// let lastMessageTime = Date.now();


// function gotMessage(message, sender, sendResponse) {
//     if (message.sendMessage) { sendMessage(message.data) }
//     if (document.querySelectorAll('[aria-label="Send a message to everyone"]').length == 0) {
//         document.querySelectorAll("[data-tooltip]")[4].click()
//         document.querySelector('[aria-label="Close"]').style.display = "none"

//         var youtubeDiv = document.createElement('div');
//         youtubeDiv.style.paddingRight = "15px";
//         youtubeDiv.classList.add("youtubeBtn");

//         var image = document.createElement("img");
//         image.src = "https://i.ibb.co/0QBkmSh/youtube.png";
//         image.style.width = "24px";
//         youtubeDiv.appendChild(image)

//         var label = document.createElement("div");
//         label.innerHTML = "Youtube"
//         label.classList.add("I98jWb");

//         youtubeDiv.appendChild(label);
//         var btmBar = document.querySelector(".LCXT6");
//         btmBar.insertBefore(youtubeDiv, btmBar.childNodes[2]);

//         youtubeDiv.addEventListener('click', function () {
//             alert("oh yeah :)")
//         });
//     }


//     const chatElements = document.querySelectorAll("[data-message-text]");
//     // element = document.querySelector('textarea'); 
//     for (chatElement of chatElements) {
//         let inner = element.innerHTML
//         if (inner.includes("youtube:")) {
//             let chatContent = chatElement.innerHTML;
//             let content = String(changable.substring(changable.indexOf("youtube:")));
//             alert("Play a youtube video here " + String(changable.replace("youtube:", "")))
//             //@info: chats that are sent at a similar time group together
//             chatElement.parentElement.children.length > 1 ? chatElement.remove() : chatElement.parentElement.parentElement.remove(); //remove a chat from the DOM depended on whether it is a single chat or a grouped chat
//         }
//     }
// }

// function sendMessage(message = "") {
//     if (getDifferenceInSeconds(lastMessageTime) > 1.5) { //prevent spam and double clicks which result in unwanted DOM changes
//         const button = document.querySelectorAll("[aria-label='Send a message to everyone']")[1];
//         const textArea = document.querySelector("textarea");
//         let initialText = textArea.value;
//         lastMessageTime = Date.now();
//         textArea.disabled = true;
//         textArea.value = message;
//         sendChatMessage(button)
//         textArea.disabled = false;
//         textArea.value = initialText;
//         textArea.parentElement.parentElement.parentElement.classList.add("CDELXb"); //removes label text
//         // button.classList.remove(button.classList[button.classList.length-1])
//         button.setAttribute("aria-disabled", "false");
//     }
// }

// function sendChatMessage(button) {
//     button.classList.remove(button.classList[button.classList.length - 1])
//     button.setAttribute("aria-disabled", "false");
//     button.click();
// }

// function getDifferenceInSeconds(date1, date2 = Date.now()) {
//     const diffInMs = Math.abs(date2 - date1);
//     return diffInMs / 1000.0;
// }





// class Type {
//     constructor(fullContent = "") { //signal, service, content
//         var fullContent = fullContent.split(",");
//         this.signal = fullContent[0];
//         this.service = fullContent[1];
//         this.content = fullContent[2];
//         if (this.signal == "studio721") {
//             switch (this.service) {
//                 case "youtube":
//                     break;
//                 case "timeCode":
//                     break;
//                 case "pause":
//                     break;
//                 case "play":
//                     break;
//                 default:
//             }
//         }
//     }
// }




