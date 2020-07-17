document.getElementsByClassName("tablink")[0].click();

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
        //adds url as iframe src
        document.getElementById("video-object").setAttribute(
            'src', 'https://www.youtube.com/embed/' + match[2] + '?modestbranding=1&controls=0"autoplay=1&enablejsapi=1');
            document.getElementById("dialog-box").style.display = "none";
    }
}
