var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = "waiting_list";
var User = require('../models/user');
var bodyParser = require('body-parser');


function authenticateUser(req, res){
  var userParams = req.body;
  User.findOne({email: userParams.email}, function(err, user){
    if(err) res.status(401).json({message: err.errmsg});
    if(!user) res.status(401).json({message: "Email not found"});

    user.authenticate(userParams.password, function(err, isMatch){
      if(err) res.status(401).json({message: err.errmsg});
      if(isMatch){
        var token = jwt.sign(user, secret);
        res.json({
          user: user,
          token: token
        });
      } else {
          res.status(401).json({message: "Incorrect password"});
        }
      });
    });
  }

module.exports = {
  authenticateUser: authenticateUser
};
