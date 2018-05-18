var express = require("express");
var router = express.Router();
var db = require("../models");
var path = require("path");
var Sequelize = require("sequelize");

   //html routes

    router.get("/", function(req, res) {
        //res.sendFile(path.join(__dirname, "../test.html"));
        res.render("index", req);

        });

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

    //api routes

    router.post("/api/:location/", function(req, res) {
      console.log(req.params.location)
  console.log("you hit the router")
      console.log(req.body);
        db.hospital.findAll({
          where: {
            surgery: "knee joint",
            zip_code: req.body.location.zip_codes[0],
            }, order: [['cost', "ASC"]]
        }).then(function(dbHospital) {
          console.log("dpHospital" + dbHospital);
          console.log("You hit the router again");
          var topFive = [];
          var l = 5;
          if (dbHospital < 5) {
              l = dbHospital.length
          }
          for (i=0; i < l; i++) {
            topFive.push(dbHospital[i]);
          }
          res.json(topFive);       
      });
    });
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

      module.exports = router;

