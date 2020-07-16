

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#openDialog").addEventListener('click', function () {
        document.getElementById('dialog-box').style.display='block';
    });

    document.querySelector(".byURL").addEventListener('click', function () {
        openFunction(event, 'Paste')
    });


    document.querySelector(".search").addEventListener('click', function () {
        openFunction(event, 'Search')  
    });


    document.querySelector(".selectBTN").addEventListener('click', function () {
        buttonClicked();  
    });
});



document.getElementsByClassName("tablink")[0].click();

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
            'src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=1&enablejsapi=1');
        document.getElementById("dialog-box").style.display = "none";
    }
}

function foo() {
    alert("foo");
}