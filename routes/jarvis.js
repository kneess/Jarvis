var Sequelize = require("sequelize");
var db = require('../models')

var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {


app.get('/', authController.signin);

app.get('/index', authController.index);

app.get('/signup', authController.signup);

app.get('/signin', authController.signin);

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/signin',
  
  failureRedirect: '/signup'
}


));



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

    db.hospitals.findAll({
      where: {
        surgery: "knee joint",
        zip_code:{[Op.in]:req.body.zips}
        }, order: [['cost', "ASC"]]
    }).then(function(dbHospital) {
    
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

