var mongoose = require('mongoose');

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
   postcode: {
      type: String,
      required: true
   },
   customers : [
     {
       customerName: {
         type: String,
         required: true,
         unique: true
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
         required: true
      },
      eta: {
         type: Number,
         required: true
      },
      finishedWaiting: { type: Date }
    },
  ]
});


// Export the model.
module.exports = mongoose.model('restaurant', RestaurantSchema);
