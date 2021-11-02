$(window).on("load",function() {
  $(".StartPage_right").animate({
    width: "40%"
  },1500);
  $(".StartPage_left").css("width", "60%");
  $(".StartPage_left_body").css("width", "60%");
  $("#StartPage_p1").html("LIBRARY<br>MANAGEMENT<br>SYSTEM").css("font-size","60px");
  $(".StartPage_left").animate({
    opacity: '1'
  },5000);
});

function home_screen_link() {
  alert("hksbv");
}
