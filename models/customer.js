var mongoose = require('mongoose');
var Restaurant = require('./restaurant');

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

// Export the model.
var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
