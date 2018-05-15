var express = require("express");
var router = express.Router();
// var db = require("../models");
var path = require("path");


module.exports = function(app) {

    //html routes

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../Jarvis/test.html"));
        });


    //api routes


};
