document.addEventListener("DOMContentLoaded", function() {
  var $theme = document.querySelector("#change_theme");
  var $body = document.querySelector("body");

  if (localStorage.getItem("theme") == "Dark") {
    $body.classList.add("black_theme");
    document.querySelector("#change_theme img").src = "img/@2x/dark.png";
  } else {
    $body.classList.remove("black_theme");
    document.querySelector("#change_theme img").src = "img/@2x/light.png";
  }

  $theme.addEventListener("click", function(event) {
    $body.classList.toggle("black_theme");
    $body.style.transition = "all 0.5s ease-in-out";
    event.preventDefault();
    var bodyclass = $body.classList.contains("black_theme");
    if (bodyclass == true) {
      localStorage.setItem("theme", "Dark");
      document.querySelector("#change_theme img").src = "img/@2x/dark.png";
    } else {
      localStorage.setItem("theme", "light");
      document.querySelector("#change_theme img").src = "img/@2x/light.png";
    }
  });
});
