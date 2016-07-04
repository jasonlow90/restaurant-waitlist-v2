var express = require('express');
var router = express.Router();
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = "waiting_list";

var restaurantController = require('../controllers/RestaurantController');
var customerController = require('../controllers/CustomerController');


router.get('/:restaurantSuburb/admin', expressJWT({secret: secret})); // view list of customers waiting; selecting restaurant by Id
router.use('/:restaurantSuburb/addcustomer', expressJWT({secret: secret}));
router.use('/:restaurantSuburb/removecustomer', expressJWT({secret: secret}));
router.use('/:restaurantSuburb/:phone/update', expressJWT({secret: secret}));
router.use('/:restaurantSuburb/admin', expressJWT({secret: secret}));



// router.use('/remove', expressJWT({secret: secret}));

// ----------index----------
router.get('/', restaurantController.showRestaurants); // show all restaurants
// ----------restaurants---------- admin pages only, not viewable to public
router.post('/restaurant/add', restaurantController.addRestaurant); // submit restaurant to the database
router.post('/:restaurantId/updaterestaurant', restaurantController.updateRestaurant); // submit restaurant to the database
router.post('/signin', restaurantController.signin);


// ----------customers----------
router.get('/:restaurantSuburb/index', customerController.getAllCustomers); // view list of customers waiting; selecting restaurant by Id
router.get('/:restaurantSuburb/admin', customerController.getAllCustomers); // view list of customers waiting, but with the customer whose phone number is in url shown highlighted.
router.get('/:restaurantSuburb/:phone', customerController.showCustomer); // view list of customers waiting, but with the customer whose phone number is in url shown highlighted.
router.post('/:restaurantSuburb/addcustomer', customerController.addCustomer); // submit customer to the database
router.post('/:restaurantSuburb/removecustomer', customerController.removeCustomer); // customer has been seated or canceled their 'order'
router.post('/:restaurantSuburb/:phone/update', customerController.updateCustomer); // submit customer updates to database


// ----------testing routes----------
// router.get('/customer/:id', restaurantController.showCustomer);

// ----------users---------- =>DEPRECATED
// router.post('/signin', usersController.authenticateUser); =>DEPRECATED

module.exports = router;
