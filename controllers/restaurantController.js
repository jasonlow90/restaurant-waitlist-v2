var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var Customer = require('../models/customer');


function showRestaurants(req, res){
  Restaurant.find({}, function(err, user){
    if(err) res.status(401).json({message: err.errmsg});
        res.json(user);
  });
}

function getAllCustomers(req, res){
  Restaurant.findOne({restaurantName: "Macdonald"}, function(err, restaurant){
    if(err) res.status(402).json({message: err.errmsg});
    res.status(200).json(restaurant.customers);
  });
}

function showCustomer(req, res){
  function findCustomer(customers){
    return customers.customerName === req.params.customer;
  }
  Restaurant.findOne({restaurantName: "Macdonald"}, function(err, restaurant){
    if(err) res.status(402).json({message: err.errmsg});
    res.status(200).json(restaurant.customers.find(findCustomer));
  });
}

function addRestaurant(req, res){
  var restaurantParams = req.body;
  Restaurant.create(restaurantParams , function(err, restaurant){
    if(err) res.status(401).json({message: "Hello"});
    res.json(restaurant);
  });

}

function addCustomer(req, res){
  // Restaurant.findOne({_id: "577606322f016641459de0e0" } , function(err, restaurant){
  Restaurant.findOne({_id: "57771ea2c31b681085727b6c" } , function(err, restaurant){ //niall seed
    if(err) res.status(401).json({message: "Hello"});
    Customer.create({
      customerName: "NIALL",
      phone: "0430852260",
      isVip: true,
      heads: 3,
      eta: 10,
      _restaurant: restaurant._id
    }, function(err, customer){
      if(err) res.status(400).json({message: "FUCK!"});
      // res.json(customer);
      // Restaurant.findOneAndUpdate({_id: "577606322f016641459de0e0"},{$push: {customers: customer}}, function(err, rest){
      Restaurant.findOneAndUpdate({_id: "57771ea2c31b681085727b6c"},{$push: {customers: customer}},  function(err, rest){ //niall seed
        if(err) res.status(400).json({message: "FUCK ME"});
        res.status(202).json(rest);
      });
    }
  );
  });
}

function populate(req, res){
//   Customer.findOne({customerName: "Jason"}).populate('_restaurant', [])
// }
  Restaurant.find({}).populate('customers').exec(function (err, customer){
    if(err) res.json({message: "fuck me?"});
    res.json(customer);
  });
}

function removeCustomer(req,res){
  var customerParams = req.body;
  Restaurant.findOneAndUpdate({restaurantName: 'Macdonald'},{$pull: {customers: customerParams}} , function(err, restaurant){
    if(err) res.status(401).json({message: err.errmsg});
    if(!restaurant) res.status(401).json({message: "No such customer"});
    res.json("Success Removed!");
  });
}

  // Keeping update code for reference:
  // Restaurant.findOneAndUpdate({restaurantName: 'Macdonald'},{$push: {customers: customerParams}} , function(err, restaurant){
  //   if(err) res.status(401).json({message: err.errmsg});
  //   res.json("Successfully Added!");
  // });

module.exports = {
  showRestaurants: showRestaurants,
  addRestaurant: addRestaurant,
  addCustomer: addCustomer,
  removeCustomer: removeCustomer,
  getAllCustomers: getAllCustomers,
  populate: populate,
  showCustomer: showCustomer
};
