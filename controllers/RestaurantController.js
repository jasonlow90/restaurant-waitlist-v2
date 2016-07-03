var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var Customer = require('../models/customer');


function showRestaurants(req, res){
  Restaurant.find({}).populate('customers').exec(function (err, customer){
    if(err) res.json({message: "Can't find restaurant/customer list"});
    res.json(customer);
  });
}

function addRestaurant(req, res){
  Restaurant.create(restaurantParams , function(err, restaurant){
    if(err) res.status(401).json({message: "Error in creating a new restaurant"});
    res.json(restaurant);
  });

}

function updateRestaurant(req, res){

  var restaurantId = req.params.restaurantId;
  var restaurantParams = req.body;
  Restaurant.findOneAndUpdate({_id: restaurantId }, {
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
  updateRestaurant: updateRestaurant
};
