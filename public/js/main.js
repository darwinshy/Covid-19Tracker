var path = document.getElementById("svg2");
var stateName = document.getElementsByClassName("overview__heading");
var timings = document.getElementsByClassName("av");

setInterval(function () {
  timings[0].innerHTML = Date().substring(0, 25);
}, 1000);

for (var i = 5; i < 77; i++) {
  path.childNodes[i].addEventListener("mouseover", (state) => {
    document.getElementById(state.target["id"]).style.fill = "#9b9b9b";

    var stNm = document.getElementById(state.target["id"]);

    stateName[0].style.opacity = "0";
    stateName[0].innerHTML = stNm.getAttribute("title");
    setInterval(function () {
      stateName[0].style.opacity = "1";
    }, 300);
  });
  path.childNodes[i].addEventListener("mouseout", (state) => {
    document.getElementById(state.target["id"]).style.fill = "#efefef";
  });
}
