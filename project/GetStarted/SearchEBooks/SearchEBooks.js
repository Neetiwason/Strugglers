var id = 0

google.books.load();

function alertNotFound() {
  if(id != 0)
    alert("Book not available")
}

function initialize() {
    var viewer = new google.books.DefaultViewer(document.getElementById('preview'));
    viewer.load('ISBN:'+String(id),alertNotFound);
}

google.books.setOnLoadCallback(initialize);

$("#btn1").click(function(){
  var key = document.getElementById('inp')
  $.get("https://www.googleapis.com/books/v1/volumes?q="+utf8Encode(inp.value), function(data, status){
    console.log(data);
    var t = document.getElementsByClassName("book")
    if (t.length<=0) {
      for (var i = 0; i < data.items.length; i++) {
        d = document.createElement("div")
        $(d).attr('id', "list"+i)
            .addClass("book")
            .appendTo(".left")
        $('<img/>',
        {
          src: data.items[i].volumeInfo.imageLinks.thumbnail,
          height: '200px'
        })
            .appendTo("#list"+i)
        d = document.createElement("p")
        $(d).html(data.items[i].volumeInfo.industryIdentifiers[0].identifier)
            .appendTo("#list"+i)
            .hide()
        var author = data.items[i].volumeInfo.authors[0]
        for (var j = 1; j < data.items[i].volumeInfo.authors.length; j++) {
          author = author + ', ' + data.items[i].volumeInfo.authors[j]
        }
        d = document.createElement("p")
        $(d).html('Title : '+data.items[i].volumeInfo.title+'<br>Authors : '+author)
            .appendTo("#list"+i)
      }
      for (var i = 0; i < data.items.length; i++) {
        d = document.getElementById("list"+i)
        d.addEventListener('click', function() {
          id = this.childNodes[1].textContent
          initialize()
        }, false);
      }
    }
    else {
      for (var i = 0; i < data.items.length; i++) {
        d = document.getElementById("list"+i)
        $(d.childNodes[0]).attr("src",data.items[i].volumeInfo.imageLinks.thumbnail)
        d.childNodes[1].innerHTML = data.items[i].volumeInfo.industryIdentifiers[0].identifier
        var author = data.items[i].volumeInfo.authors[0]
        for (var j = 1; j < data.items[i].volumeInfo.authors.length; j++) {
          author = author + ', ' + data.items[i].volumeInfo.authors[j]
        }
        d.childNodes[2].innerHTML = 'Title : '+data.items[i].volumeInfo.title+'<br>Authors : '+author
      }
    }
  });
});

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
