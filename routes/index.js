// It takes to homePage

const express = require('express');

const router = express.Router();
const homeController = require('../controller/homepage_controller');

console.log('In router');

// takes to homepage
router.get('/', homeController.home);
// if notfound,gives 404 error
router.get('/404', homeController.notFound)

router.use('/users', require('./users'));


module.exports = router;