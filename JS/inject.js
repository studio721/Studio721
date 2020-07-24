class MessageData {
    constructor(fullContent = "a,b,c") { //signal, service, content
        var fullContent = fullContent.split(",");
        this.signal = fullContent[0];
        this.service = fullContent[1];
        this.content = fullContent[2];
    }
}


var player,
    time_update_interval = 0;
    document.querySelectorAll(".l4V7wb")[0].addEventListener("mouseup", function () {
    setTimeout(function () {
        console.log("JOINED")
        openChat();
        setInterval(function () {
            const chatElements = document.querySelectorAll("[data-message-text]");
            // element = document.querySelector('textarea'); 
            for (chatElement of chatElements) {
                let chatContent = chatElement.innerHTML;
                if (chatContent.includes("studio721")) {
                    var message = new MessageData(chatContent)
                    var x = document.getElementById("play-pause");
                    if (message.service == "youtube") {
                        console.log("playing video with id " + message.content)
                        document.getElementById("dialog-box").style.display = "none";
                        openPlaybackPopup();
                        player.loadVideoById(message.content);
                    } else if (message.service == "pause") {
                        console.log("pausing video")
                        x.innerHTML = "play_arrow";
                        player.pauseVideo();
                    } else if (message.service == "play") {
                        console.log("playing video")
                        x.innerHTML = "pause";
                        player.playVideo();
                    } else if (message.service == "timeline") {
                        console.log("going to timestamp " + message.content)
                        player.seekTo(parseInt(message.content))
                    }
                    //@info: chats that are sent at a similar time group together
                    chatElement.parentElement.children.length > 1 ? chatElement.remove() : chatElement.parentElement.parentElement.remove(); //remove a chat from the DOM depended on whether it is a single chat or a grouped chat
                }
            }
        }, 500);

        // document.querySelector(".EIlDfe").classList.add("T3F3Rd")
        // document.querySelector(".fT3JUc").classList.add("LCXT6")
        // document.querySelector(".EIlDfe").classList.add("T3F3Rd")


        // studio721,youtube,cokCgWPRZPg
        // studio721,youtube,9Zd9hURkmXM
        //   studio721,pause,	
        // studio721,play,	
        // studio721,timeline,60

        function isAdmin() {
            // openChat();
            return document.body.contains(document.querySelector(".K74C9e"))
        }

        function openChat() {
            if (document.querySelectorAll(".anXpBf").length == 0) {
                document.querySelectorAll("[data-tooltip]")[4].click()
            }
            // document.querySelector(".jByv5e").style.display = "none"
        }

        function getName(){
            // openChat();
                for(var element of document.querySelectorAll(".NkoVdd")){
                    var name = element.innerHTML;
                    if(name.includes("(You)")){
                       return name.replace("(You)","");
                    }
                }
        }

        var popupGroup = document.createElement("div");
        var videoPlaceholder = document.createElement("div");
        videoPlaceholder.id = "video-placeholder";
        videoPlaceholder.style.position = "absolute";
        videoPlaceholder.style.left = "0px";
        videoPlaceholder.style.top = "10px";
        videoPlaceholder.style.height = "300px";
        videoPlaceholder.style.width = "465px";
        videoPlaceholder.style.zIndex = 0;
        videoPlaceholder.classList.add("video");
        popupGroup.append(videoPlaceholder);

        var content = `  
    
                <div class="video-display" style="z-index:0; display:none;">
                </div> `

        var controls = `
                 <div class="video-display" style="z-index:0; display:none;">
                 </div>
             
                 <div id="dialog-box" style="display:var(--display-status); z-index:200;" class="dialog">
                     <!--  change to none-->
                     <div class="dialog-content animate-zoom" style="padding-top: 9px;">
                         <img width=200px; src="https://i.ibb.co/HGsnNGr/youtube.png" style="margin-top: 8px; margin-left: 8px;">
                         <br>
                         <br>
                         <button style="margin-left:18px; margin-bottom: 5px;" class="tablink button byURL">By URL</button>
                         <button class="tablink button searchBarBTN ">Search</button>
                         <br>
                         <br>
                         <div id="Paste" class="container input-type">
                             <input placeholder="Paste Youtube URL" value="https://www.youtube.com/watch?v=LkjvwtQfRw8"
                                 class="textInput" type="text" id="vid-url" size="30">
                             <input type="button" class="form-control action selectBTN selectButton" value="Select"><br>
                         </div>
                         <div id="Search" class="container input-type">
                             <input placeholder="Search Youtube" class="textInput" type="text" id="vid-name" size="30">
                             <input type="button" class="selectButton action searchBTN" value="Search">
                             <br>
                         </div>
                         <div id="response"></div>
                         <div class=" container light-grey padding">
                             <button class="right button closeBTN" style="padding-top: 4px;"> Close</button>
                         </div>
                     </div>
                 </div>
             
                 <div style="z-index:101; display:var(--display-status); position:absolute; left:0px; top:320px;" class="controls">
                     <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                     <div class="progress-bar">
                         <input type="range" class="slider" id="progress-bar" value="0"><br>
                     </div>
                     <div class="toggle-controls" style="margin-top: 10px;">
                         <i id="play-pause" class="material-icons">pause</i>
                         <i id="mute-toggle" class="material-icons">volume_up</i>
                     </div>
                     <div class="time-display" style="position: relative; top: -6px;">
                         <p><span id="current-time">0:00</span> / <span id="duration">0:00</span></p>
                     </div>
             
                     <div class=" right toggle-controls" style="margin-top: 10px;">
                         <i id="close-window" class="material-icons">close</i>
                         <i id="zoom-in" class="material-icons">zoom_in</i>
                         <i id="zoom-out" class="material-icons">zoom_out</i>
                     </div>
                 </div>
               `
        document.querySelector("body").prepend(popupGroup);
        $(popupGroup).append(content);
        $("body").append(controls);

        document.querySelector(".closeBTN").addEventListener("click", function () {
            document.getElementById('dialog-box').style.display = 'none'
            // closePlaybackPopup();
        });

        document.querySelector(".byURL").addEventListener("click", function () {
            openFunction(event, 'Paste')
        });

        document.querySelector(".searchBarBTN").addEventListener("click", function () {
            openFunction(event, 'Search')
        });

        function openYoutubeDialog() {
            document.querySelector("#video-placeholder").style.zIndex = 100;            
            // openChat();
            document.querySelector("#dialog-box").style.display = "block";
        }

        function openPlaybackPopup() {
            document.querySelector("#video-placeholder").style.zIndex = 100;
            // openChat();
            document.querySelector(".controls").style.display = "block";
            document.querySelector(".video-display").style.display = "block";
        }

        function closePlaybackPopup() {
            document.querySelector("#video-placeholder").style.zIndex = 0;
            document.querySelector("#dialog-box").style.display = "none";
            document.querySelector(".controls").style.display = "none";
        }

        var youtubeDiv = document.createElement('div');
        youtubeDiv.style.paddingRight = "15px";
        youtubeDiv.classList.add("youtubeBtn");

        var image = document.createElement("img");
        image.src = "https://i.ibb.co/0QBkmSh/youtube.png";
        image.style.width = "24px";
        youtubeDiv.appendChild(image)

        var label = document.createElement("div");
        label.innerHTML = "Youtube"
        label.classList.add("I98jWb");

        youtubeDiv.appendChild(label);
        var btmBar = document.querySelector(".LCXT6");
        btmBar.insertBefore(youtubeDiv, btmBar.childNodes[2]);

        youtubeDiv.addEventListener('click', function () {
            openYoutubeDialog();
        });

        document.querySelector(".searchBTN").addEventListener("click", function () {
            searchVideos(document.querySelector("#vid-name").value)
        });

        document.querySelector(".selectBTN").addEventListener("click", function () {
            buttonClicked()
        });

        function buttonClicked() {
            var url = document.getElementById("vid-url").value;
            if (url != null && url != "") {
                //adds "https://" to url if needed
                if (!url.includes("https://")) {
                    url = "https://" + url;
                }
                validateYouTubeUrl(url);
            }
        }

        //Duration
        function updateTimerDisplay() {
            $('#current-time').text(formatTime(player.getCurrentTime()));
            $('#duration').text(formatTime(player.getDuration()));
        }

        function formatTime(time) {
            time = Math.round(time);
            var minutes = Math.floor(time / 60),
                seconds = time - minutes * 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            return minutes + ":" + seconds;
        }

        function validateYouTubeUrl(url) {
            console.log("validating url " + url)
            //checks if valid YouTube url
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                openPlaybackPopup();
                sendMessage("studio721,youtube," + url.replace("https://www.youtube.com/watch?v=", ""));
                player.loadVideoById(match[2]);
                document.getElementById("dialog-box").style.display = "none";
            }
        }

        function playVideo(id) {
            document.getElementById("dialog-box").style.display = "none";
            openPlaybackPopup();
            sendMessage("studio721,youtube," + id);
            player.loadVideoById(id);
        }

        function initialize() {
            updateTimerDisplay();
            updateProgressBar();
            clearInterval(time_update_interval);
            //updates progress bar every second
            time_update_interval = setInterval(function () {
                updateTimerDisplay();
                updateProgressBar();
            }, 1000)
        }

        function openFunction(evt, inputType) {
            var i, x, tablinks;
            x = document.getElementsByClassName("input-type");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablink");
            for (i = 0; i < x.length; i++) {
                tablinks[i].classList.remove("light-grey");
            }
            document.getElementById(inputType).style.display = "block";
            evt.currentTarget.classList.add("light-grey");
        }

        //Progress Bar
        $('#progress-bar').on('mouseup touchend', function (e) {
            // Calculate the new time for the video.
            // new time in seconds = total duration in seconds * ( value of range input / 100 )
            var newTime = player.getDuration() * (e.target.value / 100);
            sendMessage("studio721,timeline," + newTime);
            // Skip video to new time.
            player.seekTo(newTime);
        });

        function updateProgressBar() {
            // Update the value of progress bar accordingly.
            $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
        }

        function sendMessage(message = "") {
            const button = document.querySelectorAll("[aria-label='Send a message to everyone']")[1];
            const textArea = document.querySelector("textarea");
            let initialText = textArea.value;
            lastMessageTime = Date.now();
            textArea.disabled = true;
            textArea.value = message;
            button.classList.remove(button.classList[button.classList.length - 1])
            button.setAttribute("aria-disabled", "false");
            button.click();
            textArea.disabled = false;
            textArea.value = initialText;
            textArea.parentElement.parentElement.parentElement.classList.add("CDELXb"); //removes label text
            button.setAttribute("aria-disabled", "false");
        }

        //Play/Pause toggle
        $('#play-pause').on('click', function () {
            // document.querySelectorAll("[data-tooltip]")[4].click()
            var x = document.getElementById("play-pause");
            if (x.innerHTML === "play_arrow") {
                sendMessage("studio721,play,")
                player.playVideo();
                x.innerHTML = "pause";
            } else {
                paused = true;
                sendMessage("studio721,pause,")
                player.pauseVideo();
                x.innerHTML = "play_arrow";
            }
        });

        //Mute/Unmute toggle
        $('#mute-toggle').on('click', function () {
            var mute_toggle = $(this);
            if (player.isMuted()) {
                player.unMute();
                mute_toggle.text('volume_up');
            } else {
                player.mute();
                mute_toggle.text('volume_off');
            }
        });

        function searchVideos(string) {
            if (string.length > 1) {
                $.ajax({
                    type: 'GET',
                    url: 'https://www.googleapis.com/youtube/v3/search',
                    data: {
                        key: 'AIzaSyDk2FGm_W_j3-7flWUWqkugwa1fPhJ8cPg',
                        q: string,
                        part: 'snippet',
                        maxResults: 5,
                        type: 'video',
                        videoEmbeddable: true,
                    },
                    success: function (data) {
                        $("#response").empty();
                        $.each(data.items, function (index, item) {
                            var title = item.snippet.title;
                            var id = item.id.videoId;
                            var thumbnailImage = item.snippet.thumbnails.default.url;
                            $("#response").append(`
                            <br>
                            <div class="parent">
                            <div class="column">
                                <p class='video-title'>${title}</p>
                                <button class="button " id="playButton${id}" style="margin-left: 20px;">Play</button>
                            </div>
                            <div class="column">
                                <img src='${thumbnailImage}' id="videoThumbnail${id}"
                                    class="video-thumbnail" width='150px' height='97.5px'>
                            </div>
                            </div>
                            `)

                            document.querySelector(`#videoThumbnail${id}`).addEventListener("click", function () {
                                playVideo(id);
                            });
                            document.querySelector(`#playButton${id}`).addEventListener("click", function () {
                                playVideo(id);
                            });
                        });
                    },
                    error: function (response) {
                        console.log("Request Failed");
                    }
                });
            }
        }

        function onPlayerStateChange(event) {
            console.log(event.data);
            var x = document.getElementById("play-pause");
            // youtube fires 2xPAUSED, 1xPLAYING on seek
            if (event.data == YT.PlayerState.PAUSED) {
                sendMessage("studio721,pause,")
                x.innerHTML = "play_arrow";
            }
            if (event.data == YT.PlayerState.PLAYING) {
                sendMessage("studio721,play,")
                x.innerHTML = "pause";
            }
        }
        player = new YT.Player('video-placeholder', {
            width: 465,
            height: 300,
            playerVars: {
                color: 'white',
                controls: 0
            },
            events: { onReady: initialize, "onStateChange": onPlayerStateChange }
        });
    }, 2000);
});






