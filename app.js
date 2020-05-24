var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var request = require("request");
var dataLogics = require("./app/dataLogics");
var stateData = require("./app/stateLogic");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  request(
    {
      url: "https://api.covid19india.org/state_district_wise.json",
      json: true,
      followRedirect: true,
    },

    function (error, response, body) {
      var completeData = stateData[0](body);

      var glCnf = dataLogics[0](body)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      var glAt = dataLogics[1](body)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      var glRc = dataLogics[2](body)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      var glDh = dataLogics[3](body)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      res.render("index.ejs", {
        globalConfirmed: glCnf,
        globalActive: glAt,
        globalRecovered: glRc,
        globalDeaths: glDh,
        stateData: completeData,
      });
    }
  );
});

app.listen(process.env.PORT || 3000, function () {
  console.log("SERVER STARTED");
});
