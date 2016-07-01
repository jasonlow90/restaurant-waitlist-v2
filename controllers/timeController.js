var moment = require('moment');
moment().format();

// Initialise the time right now
var now = new Date();
var timeNow = moment(now);

// Initialise the time right now, to be manipulated by the model
var eta = new Date();
var timeETA = moment(eta);

// How many minutes the customer will need to wait
etaTimeInMins = 10;

console.log(timeNow.toISOString());
console.log(timeETA.toISOString());

// this function is stricly for adding time to the ETA
// it will be used when we initially create a customer, this function will be called by the model in a pre.save function.
var addTimeToETA = function(time) {
  // this uses the 'momentJS' library to add time in minutes on to the original ETA
  timeETA = timeETA.add(time, 'minutes');
};
// call the function for testing purposes
addTimeToETA(etaTimeInMins);
console.log(timeETA._d);

// this function resets the ETA to now, then runs the addTimeToETA function.
// it will be used if we want to update a customers waiting time to a new value.
var resetTimeOfETA = function(time){
  eta = new Date();
  timeETA = moment(eta);
  addTimeToETA(time);
};
resetTimeOfETA(20); // testing hard coded value of 20
console.log(timeETA._d);
