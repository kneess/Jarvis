var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./config/config.json");
var exphbs = require("express-handlebars");
var app = express();
var mysql = require("mysql");
var path = require("path");
var db = require("./models");
var Sequelize = require('sequelize');
var mysql2 = require('mysql2');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

var routes = require("./routes/jarvisController.js");

app.use(routes);

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "../Jarvis/test.html"));
// });

// app.get("/api/:location/", function(req, res) {
//   db.hospital.findAll({
//   //   where: {
//   //     surgery: "knee joint",
//   //     cost: {
//   //       [Op.lt]: 9000,
//   //   }
//   // }
//   }).then(function(dbHospital) {
//     res.json(dbHospital);
//      console.log("dpHospital: " + dbHospital);
//   });
 
// });

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
