document.getElementsByClassName("tablink")[0].click();

function buttonClick() {

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
    var timeCode = document.getElementById("vid-time").value;  // your input string
    var seconds = timeCode.split(':').reverse().reduce((prev, curr, i) => prev + curr*Math.pow(60, i), 0)
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        //adds url as iframe src
        document.getElementById("video-object").setAttribute(
            'src', 'https://www.youtube.com/embed/' + match[2] + '?start=' + seconds + '&modestbranding=1&controls=0&autoplay=1&enablejsapi=1');
            document.getElementById("viewer-dialog-box").style.display = "none";
    }
}
