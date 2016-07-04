var mongoose = require('mongoose');
var timeController = require('../controllers/timeController');
var Customer = require('./customer');
var bcrypt = require('bcrypt');

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
    //  select: false
   },
   password: {
     type: String,
     required: true
    //  select: false
   },
   restaurantEmail: {
     type: String,
     unique: true,
     required: true
    //  select: false
   },
   customers : [{
     type: mongoose.Schema.ObjectId,
     ref: 'Customer'
   }
 ]
});

Restaurant.pre('save', function(next) {
  // take the restaurantName value, add a space, then add on the suburb name.
  var restaurant = this;
  var restaurantName = restaurant.restaurantName;
  restaurantName = restaurantName.toLowerCase()
    .replace(/[&\/\\#,+()$~%."@:*?<>{}]/g, '-') //replace odd characters with a dash
    .replace(' ', '-') //replace spaces with a dash
    .replace(/'/g,''); //remove apostrophe
  var suburb = restaurant.suburb.toLowerCase()
    .replace(/[&\/\\#,+()$~%."@:*?<>{}]/g, '-')
    .replace(' ', '-') //replace spaces with a dash
    .replace(/'/g,''); //remove apostrophe
  var restaurantNameSuburb = restaurantName + "-" + suburb; //concatenate
  // insert final string into restaurantNameSuburb
  restaurant.restaurantNameSuburb = restaurantNameSuburb; //insert into the mongo record!

// Let's encrypt our passwords using only the model!
// This is a hook, a function that runs just before you save.

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
