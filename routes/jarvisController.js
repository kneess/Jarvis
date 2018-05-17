var express = require("express");
var router = express.Router();
var db = require("../models");
var path = require("path");


// module.exports = function(app) {

    //html routes

    router.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../test.html"));
        });


    //api routes

    router.get("/api/:location/", function(req, res) {
      var location = req.params.location;
      console.log(location);
        db.hospital.findAll({
          where: {
            surgery: "knee joint",
            zip_code: location
          //   cost: {
          //     [Op.lt]: 9000,
          // }
        }
        }).then(function(dbHospital) {
          res.json(dbHospital);
          
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

// };
