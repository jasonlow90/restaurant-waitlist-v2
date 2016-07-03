var express = require('express');
var router = express.Router();
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = "waiting_list";

var restaurantController = require('../controllers/RestaurantController');
var customerController = require('../controllers/CustomerController');


// router.use('/add', expressJWT({secret: secret}));
// router.use('/remove', expressJWT({secret: secret}));

// ----------index----------
router.get('/', restaurantController.showRestaurants); // show all restaurants
// ----------restaurants---------- admin pages only, not viewable to public
router.post('/:restaurantId/add', restaurantController.addRestaurant); // submit restaurant to the database
router.post('/:restaurantId/updateRestaurant', restaurantController.updateRestaurant); // submit restaurant to the database


// ----------customers----------
router.get('/:restaurantId/index', customerController.getAllCustomers); // view list of customers waiting; selecting restaurant by Id
router.get('/:restaurantSuburb/:phone', customerController.getAllCustomers); // view list of customers waiting, but with the customer whose phone number is in url shown highlighted.
router.post('/addCustomer', customerController.addCustomer); // submit customer to the database
router.post('/:restaurantSuburb/removeCustomer', customerController.removeCustomer); // customer has been seated or canceled their 'order'
router.post('/:restaurantSuburb/:customerPhone/update', customerController.updateCustomer); // submit customer updates to database


// ----------testing routes----------
// router.get('/customer/:id', restaurantController.showCustomer);

// ----------users---------- =>DEPRECATED
// router.post('/signin', usersController.authenticateUser); =>DEPRECATED

module.exports = router;
