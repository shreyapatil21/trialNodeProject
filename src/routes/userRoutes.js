const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

//router.get('/users', userController.handeleGetAllUsers);
//router.post('/users', userController.handeleCreateUser);
// I have merged above both statements in one statement
router.route('/users').get(userController.handeleGetAllUsers).post(userController.handeleCreateUser);

router.route('/users/:userId')
    .get(userController.handeleGetUserById)
    .put(userController.handeleUpdateUserById)
    .delete(userController.handeleDeleteUserById);

module.exports = router;