var path = document.getElementById("svg2");
var stateName = document.getElementsByClassName("overview__heading");
var timings = document.getElementsByClassName("av");

var stC = document.getElementById("stC");
var stA = document.getElementById("stA");
var stR = document.getElementById("stR");
var stD = document.getElementById("stD");

var myArr;
var stateDataForJs = new Map();
var xmlhttp = new XMLHttpRequest();
var url = "https://api.covid19india.org/state_district_wise.json";

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    myArr = JSON.parse(this.responseText);
    stateDataForJs = getMappedData(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

setInterval(function () {
  timings[0].innerHTML = Date().substring(0, 25);
}, 1000);

for (var i = 1; i < 73; i++) {
  path.childNodes[i].addEventListener("mouseover", (state) => {
    document.getElementById(state.target["id"]).style.fill = "#9b9b9b";

    var stNm = document.getElementById(state.target["id"]);

    // Changing State Name on Hover Logic
    stateName[0].style.opacity = "0";
    stateName[0].innerHTML = stNm.getAttribute("title");
    setInterval(function () {
      stateName[0].style.opacity = "1";
    }, 300);

    // Changing Data StateWise on Hover Logic
    var stateId = state.target["id"].substring(3, 5);
    stC.innerText = getStateDataWithID(stateId)[0];
    stA.innerText = getStateDataWithID(stateId)[1];
    stR.innerText = getStateDataWithID(stateId)[2];
    stD.innerText = getStateDataWithID(stateId)[3];
  });
  path.childNodes[i].addEventListener("mouseout", (state) => {
    document.getElementById(state.target["id"]).style.fill = "#efefef";
  });
}

// Getting Data Logics
function getMappedData(completeData) {
  var map = [];
  var finalmap = new Map();
  for (var stateName in completeData) {
    var c = 0,
      a = 0,
      r = 0,
      d = 0;
    for (var city in completeData[stateName].districtData) {
      c = c + parseInt(completeData[stateName].districtData[city].confirmed);
      a = a + parseInt(completeData[stateName].districtData[city].active);
      r = r + parseInt(completeData[stateName].districtData[city].recovered);
      d = d + parseInt(completeData[stateName].districtData[city].deceased);
    }

    map.push(stateName, {
      stateName: stateName,
      stateCode: completeData[stateName].statecode,
      Confirmed: c,
      Active: a,
      Recovered: r,
      Deaths: d,
    });
  }
  // console.log(map);
  map.sort(function (a, b) {
    var x = a.Confirmed;
    var y = b.Confirmed;

    if (x == undefined) {
      x = 0;
    }
    if (y == undefined) {
      y = 0;
    }

    // console.log(x);
    // console.log(y);

    if (x == y) {
      return 0;
    } else {
      return x > y ? -1 : 1;
    }
  });

  map.forEach((element) => {
    if (element["stateName"] != "State Unassigned")
      if (element.Confirmed != undefined) {
        finalmap.set(element.stateName, element);
      }
  });

  return finalmap;
}

function getStateDataWithID(id) {
  var x;

  stateDataForJs.forEach((state) => {
    if (state["stateCode"] == id) {
      x = [
        state["Confirmed"],
        state["Active"],
        state["Recovered"],
        state["Deaths"],
      ];
    }
  });
  return x;
}
