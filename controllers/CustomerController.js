var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var Customer = require('../models/customer');

function getAllCustomers(req, res){
  Restaurant.findOne({ restaurantNameSuburb: req.params.restaurantNameSuburb})
    .populate('customers').exec(function (err, restaurant){
    if(err) res.status(401).json({message: "Can't find restaurant/customer list"});
    if(!restaurant || restaurant === undefined) {
      res.status(401).json({message: "Can't find restaurant"});
      return;
    }
    res.status(202).json(restaurant.customers);
  });
}

function showCustomer(req, res){


  Restaurant.findOne({restaurantNameSuburb: req.params.restaurantNameSuburb}, function(err, restaurant){
    if(err) res.status(402).json({message: "Can't find restaurant"});
    Customer.findOne({_restaurant: restaurant._id, phone: req.params.phone}, function (err, customer){
      if(err) res.status(402).json({message: err.errmsg});
      res.status(202).json(customer);
    });
  });
}

function addCustomer(req, res) {

  Restaurant.findOne({
    restaurantNameSuburb: req.params.restaurantNameSuburb
  }, function(err, restaurant) {
    if (err) res.status(401).json({message: "couldnt find restaurant"});
    Customer.create({
      customerName: req.body.customerName,
      phone: req.body.phone,
      heads: req.body.heads,
      eta: req.body.eta,
      _restaurant: restaurant._id
    }, function(err, customer) {
      if (err) res.status(400).json({message: "Couldn't create user!"});
      Restaurant.findOneAndUpdate({_id: restaurant._id},
        {$push:{customers: customer}}, function(err, restaurant) {
        if (err) res.status(400).json({message: "couldnt push user to restaurant"});
        res.status(202).json(restaurant);
      });
    });
  });
}

function updateCustomer(req, res){

  // console.log("updating customer");
  console.log(req.body);
  Customer.findOneAndUpdate({phone: req.body.phone },{ $set:
    {
    customerName: req.body.customerName,
    phone: req.body.phone,
    heads: req.body.heads,
    eta: req.body.eta
  }},
   function(err, customer){
    if(err) res.status(400).json({message: "Unable to update customers"});
    console.log(customer);
    res.status(202).json(customer);
  });
}


function removeCustomer(req, res) {
  Customer.findOneAndRemove({
    phone: req.params.phone
  }, function(err, customer) {
    if (err) res.status(400).json({
      message: "Unable to delete customers"
    });
    res.status(202).json("Successfully removed");
  });
}

module.exports = {
  getAllCustomers: getAllCustomers,
  showCustomer: showCustomer,
  addCustomer: addCustomer,
  updateCustomer: updateCustomer,
  removeCustomer: removeCustomer
};
