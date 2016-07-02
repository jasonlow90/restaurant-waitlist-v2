var express = require('express');
var router = express.Router();
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = "waiting_list";

var restaurantController = require('../controllers/restaurantController');
var usersController = require('../controllers/UserController');

// router.use('/add', expressJWT({secret: secret}));
// router.use('/remove', expressJWT({secret: secret}));

// ----------index----------
router.get('/', restaurantController.showRestaurants); // show all restaurants

// ----------customers----------
router.get('/:restaurantSuburb', restaurantController.getAllCustomers); // view list of customers waiting
router.get('/:restaurantSuburb/:phone', restaurantController.getAllCustomers); // view list of customers waiting, but with the customer whose phone number is in url shown highlighted.
router.get('/:restaurantSuburb/addCustomer', restaurantController.addCustomer); // render the add customer form
router.post('/:restaurantSuburb/addCustomer', restaurantController.addCustomer); // submit customer to the database
router.post('/:restaurantSuburb/removeCustomer', restaurantController.removeCustomer); // customer has been seated or canceled their 'order'
router.get('/:restaurantSuburb/updateCustomer', restaurantController.updateCustomer); // render form - update (should also include a delete link for convenience)
router.post('/:restaurantSuburb/updateCustomer', restaurantController.updateCustomer); // submit customer updates to database

// ----------restaurants---------- admin pages only, not viewable to public
router.get('/restaurant/add', restaurantController.addRestaurant); // render form - setting up intitial restaurant
router.post('/:restaurantSuburb/add', restaurantController.addRestaurant); // submit restaurant to the database
router.get('/:restaurantSuburb/updateRestaurant', restaurantController.updateRestaurant); // render form - edit restaurant
router.post('/:restaurantSuburb/updateRestaurant', restaurantController.updateRestaurant); // submit restaurant to the database

// ----------testing routes----------
router.get('/customer/:id', restaurantController.showCustomer);
router.get('/populate', restaurantController.populate);

// ----------users---------- =>DEPRECATED
// router.post('/signin', usersController.authenticateUser); =>DEPRECATED

module.exports = router;
