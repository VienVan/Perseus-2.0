var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

    var usersController = require('../controllers/users');
    var locationsController = require('../controllers/locations');
    var auth = require('../resources/auth');

router.route('/api/locations')
    .get(locationsController.index);
router.route('/api/users')
    .get(usersController.getUsers)
router.route('/api/user/:id')
    .get(usersController.getUser)
router.route('/api/user/:id/locations')
    .get(usersController.getLocations)
    .post(usersController.addLocation);
router.route('/api/me')
    .get(auth.ensureAuthenticated, usersController.currentUser)
    .put(auth.ensureAuthenticated, usersController.addUser);
router.route('/auth/signup')
    .post(usersController.signUp);
router.route('/auth/login')
    .post(usersController.logIn);


module.exports = router
