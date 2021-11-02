var id = 0
var flag = false

$("#s").click(function () {
  $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
        key: 'AIzaSyCiB6VjGOG-Pm3E9Qh3cQ4MoWqzCf4QFHs',
        q: utf8Encode($("#inp").val()),
        part: 'snippet',
        maxResults: 10,
        type: 'video'
      }
  }).done(function (data) {
      console.log(data);
      t = document.getElementsByClassName("video")
      if(t.length <= 0) {
        for (var i = 0; i < data.items.length; i++) {
          d = document.createElement("div")
          $(d).attr('id','list'+i)
              .addClass('video')
              .appendTo(".left")
          $('<img/>',
          {
            src: data.items[i].snippet.thumbnails.high.url,
            width: 250
          })
              .attr('id','img'+i)
              .appendTo("#list"+i)
          d = document.createElement("p")
          $(d).attr('id','id'+i)
              .html(data.items[i].id.videoId)
              .hide()
              .appendTo("#list"+i)
          d = document.createElement("p")
          $(d).attr('id','title'+i)
              .html(data.items[i].snippet.title)
              .appendTo("#list"+i)
        }
        for (var i = 0; i < data.items.length; i++) {
          d = document.getElementById("list"+i)
          d.addEventListener('click', function() {
            id = this.childNodes[1].textContent
            if(flag)
              load();
            else
              ready();
          }, false);
        }
      }
  })
})

function utf8Encode(unicodeString) {
    if (typeof unicodeString != 'string') throw new TypeError('parameter ‘unicodeString’ is not a string');
    const utf8String = unicodeString.replace(
        /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    ).replace(
        /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
        function(c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
    return utf8String;
}

var player;
function ready() {
  flag = true
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: id,

    playerVars: {
      'playsinline': 1,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function load() {
  player.loadVideoById(id)
}

function onPlayerReady(event) {
  event.target.playVideo();
}
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
