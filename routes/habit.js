// To create habit,delete or update

const express = require('express');

const router = express.Router();
const habitController = require('../controller/habit_controller');

// create new habit
router.post('/create-habit', habitController.createHabit);
// change status of the habit
router.get('/toggle-status', habitController.toggleStatus);
// delete the habit
router.get('/delete-habit', habitController.deleteHabit);

module.exports = router;