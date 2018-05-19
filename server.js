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
var passport = require('passport');
var app = express();
var session    = require('express-session')

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

require('./config/passport/passport.js')(passport, db.user);


//app.use(routes);


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

var routes = require("./routes/jarvis")(app, passport);
// require('./config/passport/passport.js')(passport, models.user);

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
