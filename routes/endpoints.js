const express = require('express');
const {addUser,addExercise, showUsers,showUserLogs} = require('../tasks')
const router = express.Router();

router.route('/').post(addUser).get(showUsers);
router.route('/:_id/exercises').post(addExercise);
router.route('/:_id/logs').get(showUserLogs);

module.exports = router;