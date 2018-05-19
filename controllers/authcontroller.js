var exports = module.exports = {}


exports.index = function(req, res) {
    //checks to see if a user is logged in
    if(!req.user) {
            console.log(req.user)
            //returns to login page if no user is logged in
            res.redirect('/');
          } else {
            return res.render('index')
          }
    // res.render('index');
 
}

exports.signup = function(req, res) {
    if(req.user) {
        res.redirect('/index')
    } else {
 
    res.render('signup');
    }
}

exports.signin = function(req, res) {
    if(req.user) {
        res.redirect('/index')
    } else {
 
    res.render('signin');
    }
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}