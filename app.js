var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var request = require("request");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  request(
    {
      url: "https://api.covid19india.org/state_district_wise.json",
      json: true,
    },
    function (error, response, body) {
      var glCnf = globalConfirmed(body)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      var glAt = globalActive(body)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      var glRc = globalRecovered(body)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      var glDh = globalDeaths(body)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      res.render("index.ejs", {
        globalConfirmed: glCnf,
        globalActive: glAt,
        globalRecovered: glRc,
        globalDeaths: glDh,
      });
    }
  );
});

app.listen(process.env.PORT || 3000, function () {
  console.log("SERVER STARTED");
});

// ///////////////////////////////////////////////////////////////////////////
// Required Data Function Logic

function globalConfirmed(data) {
  var gl = 0;

  for (var stateName in data) {
    for (var city in data[stateName].districtData) {
      gl = gl + parseInt(data[stateName].districtData[city].confirmed);
    }
  }

  return gl;
}

function globalActive(data) {
  var gl = 0;

  for (var stateName in data) {
    for (var city in data[stateName].districtData) {
      gl = gl + parseInt(data[stateName].districtData[city].active);
    }
  }

  return gl;
}

function globalRecovered(data) {
  var gl = 0;

  for (var stateName in data) {
    for (var city in data[stateName].districtData) {
      gl = gl + parseInt(data[stateName].districtData[city].recovered);
    }
  }

  return gl;
}

function globalDeaths(data) {
  var gl = 0;

  for (var stateName in data) {
    for (var city in data[stateName].districtData) {
      gl = gl + parseInt(data[stateName].districtData[city].deceased);
    }
  }

  return gl;
}
