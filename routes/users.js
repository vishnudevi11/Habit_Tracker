// User's sign-in,sign-up and forget-password page

const express = require('express');//express

const router = express.Router();
const passport = require('passport');
const usersController = require('../controller/users_controller');


// takes to sign-in or sign-up page
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);
// passport authentication
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
// it is used to delete the user session
router.get('/sign-out', usersController.destroySession);
router.use('/habit', require('./habit'));

// takes to forget password page
router.get('/forget-password', usersController.forgetPassword);
// changes the password
router.post('/reset-password', usersController.resetPassword);

module.exports = router;