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
        $( "#search-youtube").submit(function( e ) {
	       e.preventDefault();
           var queryStr = encodeURIComponent( $( "#q" ).val() ).replace( /%20/g, "+" );
           App.getVideos( queryStr );
        });
    });

    window.init = App.init;

})( jQuery );

}

