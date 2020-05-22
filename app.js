var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.use(express.static("public"));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", function(req, res) {
    res.redirect("/home");
});

app.get("/home", function(req, res) {
    res.render("index.ejs");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("SERVER STARTED!!");
});