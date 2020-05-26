var ctx = document.getElementById("myChart").getContext("2d");
var xmlhttp = new XMLHttpRequest();
var url = "https://api.covid19india.org/data.json";
var historyData;

// Getting History.json from the API
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    historyData = getDates(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

var datesLabel = [];
var confirmedLabel = [];
var activeLabel = [];
var recoveredLabel = [];
var deathsLabel = [];
function getDates(data) {
  var dates = [];
  dates = data;
  for (eachDates in dates) {
    if (eachDates == "cases_time_series") {
      for (datesData in dates[eachDates]) {
        datesLabel.push(dates[eachDates][datesData].date);
        confirmedLabel.push(dates[eachDates][datesData].totalconfirmed);
        recoveredLabel.push(dates[eachDates][datesData].totalrecovered);
        deathsLabel.push(dates[eachDates][datesData].totaldeceased);
      }
    }
  }
}

// Creating Chart for the History
console.log(confirmedLabel);

setTimeout(() => {
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: datesLabel,
      datasets: [
        {
          data: confirmedLabel,
          label: "Confirmed",
          backgroundColor: "red",
          fill: false,
        },
        {
          data: recoveredLabel,
          label: "Recovered",
          backgroundColor: "green",
          fill: false,
        },
        {
          data: deathsLabel,
          label: "Deaths",
          backgroundColor: "grey",
          fill: false,
        },
      ],
      options: {
        title: {
          display: true,
          text: "Cases in India",
        },
      },
    },
  });
}, 1000);
