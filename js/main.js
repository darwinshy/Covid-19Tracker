var path = document.getElementById("svg2");
var stateName = document.getElementsByClassName("overview__heading");

for (var i = 5; i < 77; i++) {
  path.childNodes[i].addEventListener("mouseover", (state) => {
    document.getElementById(state.target["id"]).style.fill = "#9b9b9b";

    var stNm = document.getElementById(state.target["id"]);

    stateName[0].innerHTML = stNm.getAttribute("title");
  });
  path.childNodes[i].addEventListener("mouseout", (state) => {
    document.getElementById(state.target["id"]).style.fill = "#efefef";
  });
}
