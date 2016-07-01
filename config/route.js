var express = require('express');
var router = express.Router();
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = "waiting_list";


var restaurantController = require('../controllers/restaurantController');
var usersController = require('../controllers/UserController');

// router.use('/add', expressJWT({secret: secret}));
// router.use('/remove', expressJWT({secret: secret}));



router.get('/', restaurantController.showRestaurants);

router.get('/customers', restaurantController.getAllCustomers);

router.get('/customers/customer', restaurantController.showCustomer);


router.post('/add', restaurantController.addCustomer);

router.post('/remove', restaurantController.removeCustomer);



router.post('/signin', usersController.authenticateUser);

module.exports = router;
