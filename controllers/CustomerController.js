var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var Customer = require('../models/customer');

function getAllCustomers(req, res){
  var restaurantId = req.params.restaurantId;

  Restaurant.findOne({_id: restaurantId}).populate('customers').exec(function (err, customer){
    if(err) res.json({message: "Can't find restaurant/customer list"});
    res.json(customer.customers);
  });
}

function showCustomer(req, res){
  function findCustomer(customers){
    return customers.customerName === req.params.customer;
  }
  Restaurant.findOne({restaurantName: "Macdonald"}, function(err, restaurant){
    if(err) res.status(402).json({message: "Can't find restaurant"});
    res.status(200).json(restaurant.customers.find(findCustomer));
  });
}

function addCustomer(req, res) {
  var customerParams = req.body; // The data will be coming out from the form

  Restaurant.findOne({
    _id: "5778869baef2a4fd1888176b" //niall seed
  }, function(err, restaurant) {
    if (err) res.status(401).json({
      message: "couldnt find restaurant"
    });
    Customer.create({
      customerName: req.body.customerName,
      phone: req.body.phone,
      isVip: req.body.isVip,
      heads: req.body.heads,
      eta: req.body.eta,
      _restaurant: restaurant._id
    }, function(err, customer) {
      if (err) res.status(400).json({
        message: "Couldn't create user!"
      });
      Restaurant.findOneAndUpdate({
        _id: "5778869baef2a4fd1888176b" //niall seed
      }, {
        $push: {
          customers: customer
        }
      }, function(err, restaurant) {
        if (err) res.status(400).json({
          message: "couldnt push user to restaurant"
        });
        res.status(202).json(restaurant);
      });
    });
  });
}

function updateCustomer(req, res){

  var restaurantId = req.params.restaurantId;
  var customerPhone = req.params.phone;
  var customerParams = req.body;
  Restaurant.findOne({_id: restaurantId }, function (err, restaurant){
    if(err) res.json({message: "Can't update restaurant"});
    Customer.findOneAndUpdate({_restaurant: restaurant._id, phone: customerPhone }, {
      customerName: req.body.customerName,
      phone: req.body.phone,
      isVip: req.body.isVip,
      heads: req.body.heads,
      eta: req.body.eta
    }, function(err, customer){
      if(err) res.status(400).json({message: "Unable to update customers"});
      res.status(202).json(customer);
    });
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

module.exports = {
  getAllCustomers: getAllCustomers,
  showCustomer: showCustomer,
  addCustomer: addCustomer,
  updateCustomer: updateCustomer,
  removeCustomer: removeCustomer
};
