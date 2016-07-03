var mongoose = require('mongoose');
var timeController = require('../controllers/timeController');
var Customer = require('./customer');

// Create the CustomerSchema.
var Restaurant = new mongoose.Schema({
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

// Restaurant.pre('save', function(next) {
//   var retaurant = this;
//   // NOC: pseudo code
//   // take the restaurantName value, add a space, then add on the suburb name.
//   var restaurantName = restaurant.restaurantName;
//   restaurantName = restaurantName.toLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'-');
//
//   var suburb = restaurant.suburb;
//   // lowercase the whole thing
//   // remove anything except letters and numbers
//   // replace spaces with dashes
//   // insert final string into restaurantNameSuburb
//   next();
//   // **********
//   // var customer = this;
//   // var now = new Date();
//   // var timeETA = moment(now);
//   // timeETA = timeETA.add(customer.eta, 'minutes');
//   // this.finishedWaiting = timeETA;
//   // next();
// });

// Let's encrypt our passwords using only the model!
// This is a hook, a function that runs just before you save.
Restaurant.pre('save', function(next) {
    var restaurant = this;

    // only hash the name if it has been modified (or is new)
    if (!restaurant.isModified('password')) return next();

    // just for example purposes, let's keep the agent's name in a separate field
   //  user.unencryptedName = agent.name;
    // bcrypt can come up with a salt for us (just pass it a number)
    restaurant.password = bcrypt.hashSync(restaurant.password, 10);

    next();
});

Restaurant.methods.authenticate = function(candidatePassword, callback){
  //invoke bcrypt to attempt to compare our user with the stored user pasword
  bcrypt.compare(candidatePassword, this.password, callback);
};

// Export the model.
module.exports = mongoose.model('Restaurant', Restaurant);
