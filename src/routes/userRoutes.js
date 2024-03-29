import express from 'express';
import { verifyJWT } from '../middleware/authMiddleware.js'
import {
    handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserById,
  handleDeleteUserById,
  handleGetUserProfile,  // added this on 27/2/24 by Shreya
} from '../controllers/userController.js';
// Direct Routes for register and logon
import {handleLoginOfUser, handleLogOutOfUser} from '../controllers/authController.js'; //added this on 28/2/24 by Shreya
const userRoutes = express.Router();

userRoutes.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUser);

userRoutes.route('/:userId')
    .get(handleGetUserById)
    .put(handleUpdateUserById)
    .delete(handleDeleteUserById);
userRoutes.get('/profile/:userId',verifyJWT,handleGetUserProfile); //added this on 27/2/24 by Shreya
// Register a new user
userRoutes.post('/register', handleCreateUser);  //added this on 28/2/24 by Shreya
// Login
userRoutes.post('/login', handleLoginOfUser);  //added this on 28/2/24 by Shreya

// Secured Routes
userRoutes.post('/logout',verifyJWT,handleLogOutOfUser);

export default userRoutes;
