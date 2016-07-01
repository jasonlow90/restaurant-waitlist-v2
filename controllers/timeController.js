var moment = require('moment');
moment().format();

var now = new Date();
var timeNow = moment(now);

var eta = new Date();
var timeETA = moment(eta);

etaTimeInMins = 5;

console.log(timeNow.toISOString());
console.log(timeETA.toISOString());
