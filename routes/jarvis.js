 var express = require("express");
 var router = express.Router();
// var db = require("../models");
 var path = require("path");
 var Sequelize = require("sequelize");
var db = require('../models')
// var Op = Sequelize.Op;
//html routes
var authController = require('../controllers/authcontroller.js');
// 
module.exports = function(app, passport) {
// app.get("/", function(req, res) {
//   //res.sendFile(path.join(__dirname, "../test.html"));
//   res.render("index", req);
  
// });
// app.get("/", function(req,res,next) {
//   console.log(req.user)
// })

app.get('/', authController.signin);

app.get('/index', authController.index);

app.get('/signup', authController.signup);

app.get('/signin', authController.signin);

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/signin',
  
  failureRedirect: '/signup'
}


));

// app.get('/index',isLoggedIn, authController.dashboard);

app.get('/logout',authController.logout);

function isLoggedIn(req, res, next) {
 
  if (req.isAuthenticated())
   
      return next();
       
  res.redirect('/signin');

}

app.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/index',

  failureRedirect: '/signin'
}

));

//api routes
var Op = Sequelize.Op;
app.post("/api", function(req, res) {
  console.log("You hit the router")
  console.log(req.body);

  // var newZip = req.body.zips
  // console.log(newZip);
    db.hospitals.findAll({
      where: {
        surgery: "knee joint",
        zip_code:{[Op.in]:req.body.zips}
        }, order: [['cost', "ASC"]]
    }).then(function(dbHospital) {
      // console.log("dpHospital" + dbHospital);
      // console.log("You hit the router again");
      // var topFive = [];
      // var l = 5;
      // if (dbHospital < 5) {
      //     l = dbHospital.length
      // }
      // for (i=0; i < l; i++) {
      //   topFive.push(dbHospital[i]);
      // }
      res.json(cheapestHospitals(dbHospital));       
  });
}); 

function cheapestHospitals(dbHospital){
  console.log("dpHospital" , dbHospital);
  console.log("You hit the router again");
  var topFive = [];
  var l = 5;
  if (dbHospital < 5) {
      l = dbHospital.length
  }
  for (i=0; i < l; i++) {
    topFive.push(dbHospital[i]);
  }
  // res.json(topFive); 
  return topFive;
  
};
}


    // router.get("/api/location", function(req, res){
    //   db.hospital.findAll({
    //     where: {
    //       surgery: "knee joint",
    //       zip_code: req.body.location.zip_codes[0],
    //       // order: [sequelize.fn('max', sequelize.col('cost')), 'DESC'],
    //   }
    //   }).then(function(dbHospital) {
    //     console.log("dpHospital" + dbHospital);
    //     console.log("You hit the router again");
    //     res.json(dbHospital);       
    // });
    // })

      // router.post("/api/newclient", function(req, res) {
      //   console.log(req.body);
      //   // create takes an argument of an object describing the item we want to
      //   // insert into our table. In this case we just we pass in an object with a text
      //   // and complete property (req.body)
      //   db.clients.create({
      //     client_userID: req.body.client_userID,
      //     passcode: req.body.passcode,
      //     zip_code: req.body.zipcode,

      //   }).then(function(dbclients) {
      //     // We have access to the new clients as an argument inside of the callback function
      //     res.json(dbclients);
      //   });
      // });

      //  module.exports = router;

