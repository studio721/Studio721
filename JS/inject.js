var player,
    time_update_interval = 0;
document.querySelectorAll(".l4V7wb")[0].addEventListener("mouseup", function() {
    setTimeout(function() {
        console.log("JOINED")
        document.querySelectorAll(".ZaI3hb")[1].addEventListener("click", function() {
            setTimeout(function() {
                console.log("OPENED CHAT")
                var videoPlaceholder = document.createElement("div");
                videoPlaceholder.id = "video-placeholder";
                videoPlaceholder.classList.add("video");
                document.querySelector(".vvTMTb").prepend(videoPlaceholder);

                var content = `  
            
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                <div class="container">
                <h2>YouTube Viewer</h2>
                <button class="shareVideo button openDialog">
                Share YouTube video
                </button>
                <br><br>
                <div id="dialog-box" class="dialog">
                    <div class="dialog-content animate-zoom">
                        <header class="container">
                            <h2></h2>
                        </header>
                        <button style="margin-left:7px; margin-bottom: 5px; " class="tablink button byURL">By URL</button>
                        <button class="tablink button searchBarBTN ">Search</button>

                       
                        <div id="Paste" class="container input-type">
                            <input value="https://www.youtube.com/watch?v=LkjvwtQfRw8" type="text" id="vid-url" size="30">
                            <input type="button" class="action selectBTN" value="Select"><br>
                            <p>Paste your YouTube URL in the box above.</p>
                        </div>


                      <div id="Search" class="container input-type">
                          <input type="text" id="vid-name" size="30">
                          <input type="button" class="action searchBTN" value="Search"><br>
                          <p>Type your search in the box above to find videos.</p>
                      </div>
                    


                        <div class="container light-grey padding">
                            <button class="right white border closeBTN">Close</button>
                        </div>
                    </div>
                </div>
                </div>
                <div class="video-display">
                <div id="video-placeholder" class="video"></div>
                </div>
                <div id="controls" class="controls">
                <div class="progress-bar">
                    <input type="range" id="progress-bar" value="0"><br>
                </div>
                <div class="toggle-controls">
                    <i id="play-pause" class="material-icons">pause</i>
                    <i id="mute-toggle" class="material-icons">volume_up</i>
                </div>
                <div class="time-display">
                    <p><span id="current-time">0:00</span> / <span id="duration">0:00</span></p>
                </div>
                </div>
                 `
                $(".vvTMTb").prepend(content)

                document.querySelector(".shareVideo").addEventListener("click", function() {
                    document.getElementById('dialog-box').style.display = 'block';
                });
                
                document.querySelector(".closeBTN").addEventListener("click", function() {
                    document.getElementById('dialog-box').style.display = 'none'
                });
                
                document.querySelector(".byURL").addEventListener("click", function() {
                    openFunction(event, 'Paste')
                });
                
                document.querySelector(".searchBarBTN").addEventListener("click", function () {
                    openFunction(event, 'Search')
                });

                // document.querySelector(".searchBTN").addEventListener("click", function () {
                //     // openFunction(event, 'Search')

                // });

                
                document.querySelector(".selectBTN").addEventListener("click", function() {
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
                    //checks if valid YouTube url
                    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                    var match = url.match(regExp);
                    if (match && match[2].length == 11) {            
                        sendMessage("studio721,youtube," + url);        
                        player.loadVideoById(match[2]);
                        document.getElementById("dialog-box").style.display = "none";
                    }
                }
                
                function initialize() {
                    updateTimerDisplay();
                    updateProgressBar();
                    clearInterval(time_update_interval);
                    //updates progress bar every second
                    time_update_interval = setInterval(function() {
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
                    console.log(inputType)

                    console.log(document.getElementById(inputType))
                    document.getElementById(inputType).style.display = "block";
                    evt.currentTarget.classList.add("light-grey");
                }
                
                //Progress Bar
                $('#progress-bar').on('mouseup touchend', function(e) {
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
                $('#play-pause').on('click', function() {
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
                $('#mute-toggle').on('click', function() {
                    var mute_toggle = $(this);
                    if (player.isMuted()) {
                        player.unMute();
                        mute_toggle.text('volume_up');
                    } else {
                        player.mute();
                        mute_toggle.text('volume_off');
                    }
                });




                (function( $ ) {
                    var App = {
                        init: function() {
                            gapi.client.setApiKey( "AIzaSyDk2FGm_W_j3-7flWUWqkugwa1fPhJ8cPg" );
                            gapi.client.load( "youtube", "v3", function() {
                                //App.getVideos();
                            });
                        },
                        getVideos: function( query ) {
                            query = query || "jquery";

                            var request = gapi.client.youtube.search.list({
                                part: "snippet",
                                type: "video",
                                q: query,
                                maxResults: 20,
                                order: "viewCount"
                            });

                            request.execute(function( response ) {
                                var results = response.result;
                                var html = "";
                                $.each( results.items, function( index, item ) {
                                    var title = item.snippet.title;
                                    var id = item.id.videoId;
                                    html += '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + id + '?controls=0" frameborder="0" allowfullscreen></iframe>';
                                    html += "<h3>" + title + "</h3>";
                                    html += "<div class='video'>";
                                    html += "</div>";
                                });
                                $( "#response").html( html );
                            });
                        }
                    };

                    $(function() {

  
                        $( ".searchBTN").click(function( e ) {
                            console.log("searched vtn presed")
                        e.preventDefault();
                        var queryStr = encodeURIComponent( $( "#q" ).val() ).replace( /%20/g, "+" );
                        App.getVideos( queryStr );
                        });
                    });

                    window.init = App.init;

                })( jQuery );
                
                player = new YT.Player('video-placeholder', {
                width: 310,
                height: 200,
                playerVars: {
                    color: 'white',
                    controls: 0
                },
                events: {onReady: initialize }
                });
                }, 10);
                });
                }, 2000);
                });                
                
                if (!window['YT']) {
                    var YT = {
                        loading: 0,
                        loaded: 0
                    };
                }
                if (!window['YTConfig']) {
                    var YTConfig = {
                        'host': 'http://www.youtube.com'
                    };
                }
                if (!YT.loading) {
                    YT.loading = 1;
                    (function() {
                        var l = [];
                        YT.ready = function(f) {
                            if (YT.loaded) {
                                f();
                            } else {
                                l.push(f);
                            }
                        };
                        window.onYTReady = function() {
                            YT.loaded = 1;
                            for (var i = 0; i < l.length; i++) {
                                try {
                                    l[i]();
                                } catch (e) {}
                            }
                        };
                        YT.setConfig = function(c) {
                            for (var k in c) {
                                if (c.hasOwnProperty(k)) {
                                    YTConfig[k] = c[k];
                                }
                            }
                        };
                        var c = document.currentScript;
                        if (c) {
                            var n = c.nonce || c.getAttribute('nonce');
                            if (n) {}
                        }
                    })();
                }





