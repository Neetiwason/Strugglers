$("#search").click(function () {
  $.ajax({
      url: 'http://api.mediastack.com/v1/news',
      data: {
        access_key: '4c9b92945444526f72cf3ea2a898188d',
        countries: $("#country").children("option").filter(":selected").val(),
        categories: $("#category").children("option").filter(":selected").text(),
        languages: $("#language").children("option").filter(":selected").val(),
        limit: 30,
        offset: 30,
      }
    }).done(function(data) {
      console.log(data);
      t = document.getElementsByClassName("para")
      if(t.length <= 0) {
        if(data.data.length > 0) {
          d = document.createElement("H1")
          $(d).attr('id','header')
              .html($("#country").children("option").filter(":selected").text()+"-"+$("#category").children("option").filter(":selected").text())
              .appendTo(".right")
          d = document.createElement("HR")
          $(d).attr('id','rule2')
              .appendTo(".right")
        }
        else {
          alert($("#country").children("option").filter(":selected").text()+"-"+$("#category").children("option").filter(":selected").text()+" Not Available")
        }
        for (var i = 0; i < data.data.length; i++) {
          d = document.createElement("div")
          $(d).attr('id', "list"+i)
              .addClass("para")
              .appendTo(".right")
          d = document.createElement("H2")
          $(d).attr('id', "head"+i)
              .html((i+1)+") <br>"+data.data[i].title)
              .appendTo("#list"+i)
          $('<img/>',{
            src: data.data[i].image,
            style: "max-height:200px"
          })
              .attr('id','img'+i)
              .appendTo("#list"+i)
          d = document.createElement("p")
          $(d).attr('id', "p"+i)
              .html(data.data[i].description+"<br><br><i>"+"~"+data.data[i].author+"</i>")
              .appendTo("#list"+i)
            d = document.createElement("a")
          $(d).attr('id','link'+i)
              .attr('href',data.data[i].url)
              .attr('target','_blank')
              .html("Full Article")
              .appendTo("#list"+i)
        }
      }
      else {
        if (data.data.length > 0)
          $('#header').html($("#country").children("option").filter(":selected").text()+"-"+$("#category").children("option").filter(":selected").text())
        else {
          alert($("#country").children("option").filter(":selected").text()+"-"+$("#category").children("option").filter(":selected").text()+" Not Available")
        }
        for (var i = 0; i < data.data.length; i++) {
          $("#head"+i).html((i+1)+") <br>"+data.data[i].title)
          $("#img"+i).attr('src',data.data[i].image).attr('style','max-height:200px')
          $("#p"+i).html(data.data[i].description+"<br><br><i>"+"~"+data.data[i].author+"</i>")
          $("#link"+i).attr('href',data.data[i].url)
        }
      }
  });
})
