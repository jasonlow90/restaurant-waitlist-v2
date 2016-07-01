var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(methodOverride('X-HTTP-Method-Override'));
// Create the application.

// Load the routes.
var routes = require('./config/route');
// NOC: seed some data
var Customer = require('./models/customer');
var User = require('./models/user');
var Restaurant = require('./models/restaurant');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/waiting_list');

// require('./models/db');

// Seeding file
var jason = new User({
  username: 'Jason',
  email: 'jason@example.com',
  password: 'password123'
});

// User.create(jason);
//   if (err) return (err);

//   var macdonald = new Restaurant({
//     createdBy: jason._id,
//     restaurantName: 'Macdonald',
//     website: 'www.google.com',
//     phone: '123456789',
//     addresss: 'melbourne street',
//     suburb: 'Melbourne',
//     postcode : '3030'
//   });
// //
//  macdonald.save(function (err) {
//    if (err) return (err);
//    var d = new Date();
//    var n = d.getTime();
//    var seed_customer = new Customer({
//      createdBy: macdonald._id,
//    	name: 'Peter',
//    	phone: '0412345678',
//      is_vip: true,
//      heads: 2,
//      started_waiting: n,
//      eta: 10,
//      finished_waiting: n
//    });
//  });
//  seed_customer.save(function (err) {
//    if (err) return (err);
//
// });
// });
// User.create(jason);
//
var d = new Date();
var n = d.getTime();
var macdonald = new Restaurant({
  restaurantName: 'Macdonald',
  website: 'www.google.com',
  phone: '123456789',
  address: 'melbourne street',
  suburb: 'Melbourne',
  postcode : '3030',
  customers: [
    {
      customerName: 'Peter',
      phone: '0412345678',
      isVip: true,
      heads: 2,
      startedWaiting: n,
      eta: 10,
      finishedWaiting: n
    }
  ]

});

// Restaurant.create(macdonald);
// Customer.create(seed_customer);

// Add Middleware necessary for REST API's
app.use(routes);


//
  // Load the models.


  app.listen(3000, function(){

    console.log('Listening on port 3000...');
  });
