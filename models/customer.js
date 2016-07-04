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
      required: true,
      unique: true
   },
   phone: {
      type: String,
      required: true,
      // unique: true
   },
   isVip: {
      type: Boolean,
      default: false,
      select: false
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

// Customer middleware
Customer.pre('save', function(next) {
  console.log("saving NEW CUSTOMER");
  var customer = this;
  var now = new Date();
  var timeETA = moment(now);
  timeETA = timeETA.add(customer.eta, 'minutes').add(30, 'seconds');
  this.finishedWaiting = timeETA;
  next();
});

Customer.pre('findOneAndUpdate', function(next) {
  console.log("updating EXISTING CUSTOMER");
  var customer = this;
  var now = new Date();
  var timeETA = moment(now);
  // select the ETA time value from the userform.
  timeETA = timeETA.add(this._update.$set.eta, 'minutes').add(30, 'seconds');
  console.log(timeETA);
  this._update.$set.finishedWaiting = timeETA;
  next();
});

// Export the model.
var Customer = mongoose.model('Customer', Customer);

module.exports = Customer;
