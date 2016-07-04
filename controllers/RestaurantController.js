var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var Customer = require('../models/customer');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = "waiting_list";

function signin (req,res){
  var restaurantParams = req.body;
  console.log(restaurantParams);
  Restaurant.findOne({restaurantEmail: restaurantParams.restaurantEmail}, function(err, restaurant){
    console.log(restaurant);
    if(err) res.status(402).json({message: err.errmsg});
    if(!restaurant) res.status(402).json({message: "Can't find restaurant"});
    restaurant.authenticate(restaurantParams.password, function(err, isMatch){
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
  var restaurantParams = req.body;
  Restaurant.create({
    "postcode": restaurantParams.postcode,
    "suburb": restaurantParams.suburb,
    "address": restaurantParams.address,
    "phone": restaurantParams.phone,
    "website": restaurantParams.website,
    "restaurantName": restaurantParams.restaurantName,
    "cuisine": restaurantParams.cuisine,
    "username": restaurantParams.username,
    "password": restaurantParams.password,
    "restaurantEmail": restaurantParams.restaurantEmail
  } , function(err, restaurant){
    console.log(err);
    if(err) res.status(401).json({message: err.errmsg});
    res.json(restaurant);
  });

}

function updateRestaurant(req, res){

  var restaurantId = req.params.restaurantId;
  var restaurantParams = req.body;
  Restaurant.findOneAndUpdate({_id: restaurantId }, {
   "postcode": restaurantParams.postcode,
   "suburb": restaurantParams.suburb,
   "address": restaurantParams.address,
   "phone": restaurantParams.phone,
   "website": restaurantParams.website,
   "restaurantName": restaurantParams.restaurantName,
   "cuisine": restaurantParams.cuisine,
   "username": restaurantParams.username,
   "restaurantEmail": restaurantParams.restaurantEmail
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
