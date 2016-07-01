var Restaurant = require('../models/restaurant');
var User = require('../models/user');
// var Customer = require('../models/customer');


function showRestaurants(req, res){
  Restaurant.find({}, function(err, user){
    if(err) res.status(401).json({message: err.errmsg});
    // Restaurant.find({user._id}, function(err, restaurant){
    //   if(err) res.status(401).json({message: err.errmsg});
    //   Customer.find({restaurant._id}, function(err, customer){
    //     if(err) res.status(401).json({message: err.errmsg});
        res.json(user);

    //   })
    // })
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

function addCustomer(req, res){
//   var d = new Date();
//
//   var n = d.getTime();
//   var jason = {
//     customerName: 'Jane',
//     phone: '0412345678',
//     isVip: false,
//     heads: 2,
//     startedWaiting: n,
//     eta: 10,
//     finishedWaiting: n
//   };
  var customerParams = req.body;

  Restaurant.findOneAndUpdate({restaurantName: 'Macdonald'},{$push: {customers: customerParams}} , function(err, restaurant){
    if(err) res.status(401).json({message: err.errmsg});
    res.json("Successfully Added!");
  });

}

function removeCustomer(req,res){

  // var d = new Date();
  // var n = d.getTime();
  // var jason = {
  //   customerName: 'Jason',
  //   phone: '0412345678',
  //   isVip: false,
  //   heads: 2,
  //   startedWaiting: n,
  //   eta: 10,
  //   finishedWaiting: n
  // };

  var customerParams = req.body;
  Restaurant.findOneAndUpdate({restaurantName: 'Macdonald'},{$pull: {customers: customerParams}} , function(err, restaurant){
    if(err) res.status(401).json({message: err.errmsg});
    if(!restaurant) res.status(401).json({message: "No such customer"});
    res.json("Success Removed!");
  });

}


module.exports = {
  showRestaurants: showRestaurants,
  addCustomer: addCustomer,
  removeCustomer: removeCustomer,
  getAllCustomers: getAllCustomers,
  showCustomer: showCustomer
};
