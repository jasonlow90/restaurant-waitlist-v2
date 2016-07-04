var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var Customer = require('../models/customer');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = "waiting_list";

function signin (req,res){
  Restaurant.findOne({restaurantEmail: req.body.restaurantEmail}, function(err, restaurant){
    if(err) res.status(402).json({message: err.errmsg});
    if(!restaurant) res.status(402).json({message: "Can't find restaurant"});
    restaurant.authenticate(req.body.password, function(err, isMatch){
      if(err) res.status(402).json({message: err.errmsg});
      if(isMatch){
        var token = jwt.sign(restaurant, secret);
        res.json({
          restaurant: restaurant,
          token: token
        });
      } else {

        res.status(401).json({message: "Incorrect Password"});
      }
    });
  });
}

function showRestaurants(req, res){
  Restaurant.find({}).populate('customers').exec(function (err, customer){
    if(err) res.json({message: "Can't find restaurant/customer list"});
    res.json(customer);
  });
}

function addRestaurant(req, res){

  Restaurant.create({
    "postcode": req.body.postcode,
    "suburb": req.body.suburb,
    "address": req.body.address,
    "phone": req.body.phone,
    "website": req.body.website,
    "restaurantName": req.body.restaurantName,
    "cuisine": req.body.cuisine,
    "username": req.body.username,
    "password": req.body.password,
    "restaurantEmail": req.body.restaurantEmail
  } , function(err, restaurant){
    console.log(err);
    if(err) res.status(401).json({message: err.errmsg});
    res.json(restaurant);
  });

}

function updateRestaurant(req, res){

  Restaurant.findOneAndUpdate({_id: req.body.restaurantNameSuburb }, {
   "postcode": req.body.postcode,
   "suburb": req.body.suburb,
   "address": req.body.address,
   "phone": req.body.phone,
   "website": req.body.website,
   "restaurantName": req.body.restaurantName,
   "cuisine": req.body.cuisine,
   "username": req.body.username,
   "restaurantEmail": req.body.restaurantEmail
  }, function (err, restaurant){
    if(err) res.json({message: "Can't update restaurant"});
    res.json(restaurant);
  });
}




module.exports = {
  showRestaurants: showRestaurants,
  addRestaurant: addRestaurant,
  updateRestaurant: updateRestaurant,
  signin: signin
};
