$(function() {
  var searchField = $('#query');
  var icon = $('#search-btn');

  $(searchField).on('focus', function() {
    $(this).animate({
      width:'100%'
    }, 400);
  });

  $(searchField).on('blur', function() {
    if(searchField.val() == ''){
      $(searchField).animate({
        width:'45%'
      }, 400, function() {});
    }
  });

  $('#search-form').submit(function(e) {
    e.preventDefault();
  });
})


function search() {
  //clear results
  $('#results').html('');
  $('#buttons').html('');

  q = $('#query').val();

  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      type: 'video',
      key: 'AIzaSyDk2FGm_W_j3-7flWUWqkugwa1fPhJ8cPg'},
      function(data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item) {
          var output = getOutput(item);

          //display results
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        //display buttons
        $('#buttons').append(buttons);




      }
  );

}

//next page function
function nextPage() {
  var token = $('#next-button').data('token');

  var q = $('#next-button').data('query');
  //clear results
  $('#results').html('');
  $('#buttons').html('');

  q = $('#query').val();

  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyDk2FGm_W_j3-7flWUWqkugwa1fPhJ8cPg'},
      function(data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item) {
          var output = getOutput(item);

          //display results
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        //display buttons
        $('#buttons').append(buttons);




      }
  );

}

function prevPage() {
  var token = $('#prev-button').data('token');

  var q = $('#prev-button').data('query');
  //clear results
  $('#results').html('');
  $('#buttons').html('');

  q = $('#query').val();

  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyDk2FGm_W_j3-7flWUWqkugwa1fPhJ8cPg'},

      function(data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item) {
          var output = getOutput(item);

          //display results
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        //display buttons
        $('#buttons').append(buttons);




      }
  );

}

function getOutput(item) {
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  var output = '<li>' +
  '<div class="list-left">' +
  '<img src="'+thumb+'">' +
  '</div>' +
  '<div class="list-right">' +
  '<h3>'+title+'</h3>' +
  '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate + '</small>' +
  '<p>'+description+'</p>' +
  '<button id="play-video" data-url="http://www.youtube.com/embed/'+videoId+'?autoplay=1" onclick="playVideo()">Play</button>'+
  '</div>' +
  '</li>' +
  '<div class="clearfix"</div>' +
  '';

  return output;
}

function playVideo(){
    ////////"document.getElementById('dialog-box').style.display='none'"
    $('#results').html('');
    $('#buttons').html('');
    var vidurl = $('#play-video').data('url');
    console.log(vidurl);
    $("#player").html('<iframe width="640" height="390" src="'+vidurl+'?controls=0" frameborder="0" allowfullscreen></iframe>');
}

//build buttons
function getButtons(prevPageToken, nextPageToken) {
  if(!prevPageToken) {
    var btnoutput = '<div class="button-container">'+
    '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
    'onclick="nextPage();">Next Page</button></div>';
  } else {
    var btnoutput = '<div class="button-container">'+
    '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
    'onclick="prevPage();">Prev Page</button>' +
    '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
    'onclick="nextPage();">Next Page</button></div>';
  }

  return btnoutput;
}
