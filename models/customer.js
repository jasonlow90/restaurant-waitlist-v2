var mongoose = require('mongoose');
var Restaurant = require('./restaurant');
var timeController = require('../controllers/timeController');
var moment = require('moment');

// Create the CustomerSchema.
var CustomerSchema = new mongoose.Schema({
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
      required: true
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
CustomerSchema.pre('save', function(next) {
  //           ⤹ the customer
  // var customer = this;

  timeController.resetTimeOfETA(CustomerSchema.eta);
  Customer.finishedWaiting = timeController.timeETA;

  // if(!user.isModified('password')) return next();
  // bcrypt.genSalt(10, function(err, salt) {
  //   if (err) return next(err);
  //   // 3 arguments: password, salt, hash
  //   bcrypt.hash(user.password, salt, function(err, hash) {
  //     if (err) return next(err);
  //     user.password = hash;
  //     next();
  //   });
  // });
});

// Export the model.
var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
