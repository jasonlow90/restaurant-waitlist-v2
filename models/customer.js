var mongoose = require('mongoose');
var Restaurant = require('./restaurant');
var timeController = require('../controllers/timeController');
var moment = require('moment');

// Create the Customer Schema.
var Customer = new mongoose.Schema({
   _restaurant: {
     type: mongoose.Schema.ObjectId,
     ref: 'Restaurant'
   },
   customerName: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true,
      unique: true
   },
   isVip: {
      type: Boolean,
      default: false
   },
   heads: {
      type: Number,
      required: true
   },
   startedWaiting: {
      type: Date,
      default: Date.now,
      // required: true
   },
   eta: {
      type: Number,
      required: true
   },
   finishedWaiting: {
      type: Date,
      // required: true
   }
});

// User middleware
Customer.pre('save', function(next) {
  var customer = this;
  var now = new Date();
  var timeETA = moment(now);
  timeETA = timeETA.add(customer.eta, 'minutes');
  this.finishedWaiting = timeETA;
  next();
});

// Export the model.
var Customer = mongoose.model('Customer', Customer);

module.exports = Customer;
