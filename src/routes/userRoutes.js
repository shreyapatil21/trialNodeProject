import express from 'express';
import {
    handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserById,
  handleDeleteUserById,
} from '../controllers/userController.js';
const userRoutes = express.Router();
//router.get('/users', userController.handeleGetAllUsers);
//router.post('/users', userController.handeleCreateUser);
// I have merged above both statements in one statement
userRoutes.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUser);

userRoutes.route('/:userId')
    .get(handleGetUserById)
    .put(handleUpdateUserById)
    .delete(handleDeleteUserById);
    //userRoutes.use('/users', userRoutes);
//export default userRoutes;
module.exports = userRoutes;