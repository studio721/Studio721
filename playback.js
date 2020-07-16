var player,
    time_update_interval = 0;

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

function validateYouTubeUrl(url) {
    //checks if valid YouTube url
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {

        player.loadVideoById(match[2]);
        document.getElementById("dialog-box").style.display = "none";
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 620,
        height: 400,
        playerVars: {
            color: 'white',
            controls: 0
        },
        events: {
            onReady: initialize
        }
    });
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

//Progress Bar
$('#progress-bar').on('mouseup touchend', function (e) {
    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);

});

function updateProgressBar() {
    // Update the value of progress bar accordingly.
    $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
}

//Play/Pause toggle
$('#play-pause').on('click', function () {
    var x = document.getElementById("play-pause");
    
    if (x.innerHTML === "pause") {
        player.pauseVideo();
        x.innerHTML = "play_arrow";
    }
    else {
        player.playVideo();
        x.innerHTML = "pause";
    }
});

//Mute/Unmute toggle
$('#mute-toggle').on('click', function () {
    var mute_toggle = $(this);

    if (player.isMuted()) {
        player.unMute();
        mute_toggle.text('volume_up');
    }
    else {
        player.mute();
        mute_toggle.text('volume_off');
    }
});
