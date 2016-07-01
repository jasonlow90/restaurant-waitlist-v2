var mongoose = require('mongoose');
var timeController = require('../controllers/timeController');

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
      finishedWaiting: { type: Date,  }
    },
  ]
});

// Restaurant.pre.save function to take startedWaiting time
// and use it to create finishedWaiting time using the 'ETA' time value
// i.e. Add a customer at '15:10', eta time is 15mins, therefore finishedWaiting will be '15:25'
// RestaurantSchema.pre('save', function(next) {
//   var now = new Date();
//   this.updated_at = now;
//   if (!this.created_at) {
//     this.created_at = now;
//   }
//   next(); //must call this
// });

// Export the model.
module.exports = mongoose.model('restaurant', RestaurantSchema);
