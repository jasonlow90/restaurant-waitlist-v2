var mongoose = require('mongoose');
var timeController = require('../controllers/timeController');
var Customer = require('./customer');

// Create the CustomerSchema.
var RestaurantSchema = new mongoose.Schema({
   restaurantName: {
      type: String,
      required: true,
      unique: true
   },
   website: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   suburb: {
      type: String,
      required: true
   },
   restaurantNameSuburb: {
     type: String
   },
   postcode: {
      type: String,
      required: true
   },
   cuisine: {
     type: String
   },
   username: {
     type: String,
     required: true,
     unique: true,
     select: false
   },
   password: {
     type: String,
     required: true,
     select: false
   },
   restaurantEmail: {
     type: String,
     unique: true,
     required: true,
     select: false
   },
   customers : [{
     type: mongoose.Schema.ObjectId,
     ref: 'Customer'
   }
 ]
});

Restaurant.pre('save', function(next) {
  var retaurant = this;
  // NOC: pseudo code
  // take the restaurantName value, add a space, then add on the suburb name.
  // lowercase the whole thing
  // remove anything except letters and numbers
  // replace spaces with dashes
  // insert final string into restaurantNameSuburb
  next();
});

// Export the model.
module.exports = mongoose.model('Restaurant', RestaurantSchema);
