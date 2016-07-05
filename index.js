var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var cors = require('cors');
// Load the routes.
var routes = require('./config/route');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/waiting_list');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/waiting_list');
// Create the application.)



// require('./models/db');

// Add Middleware necessary for REST API's
app.use(routes);
// Load the models.

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port xxxx || 3000...');
});
