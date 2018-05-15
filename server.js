var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./config/connection.js"); 
var exphbs = require("express-handlebars");
var app = express();
var mysql = require("mysql");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("app/public"));

var routes = require("./controllers/jarvisController.js");

app.use(routes);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});