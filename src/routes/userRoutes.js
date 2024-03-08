import express from 'express';
import { verifyJWT } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerMiddleware.js';
import {
    handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserById,
  handleDeleteUserById,
  handleGetUserProfile,  // added this on 27/2/24 by Shreya
  handleUpdateUserFields, // added on 5/3/24 by Shreya
} from '../controllers/userController.js';
// Direct Routes for register and logon
import {handleLoginOfUser, handleLogOutOfUser} from '../controllers/authController.js'; //added this on 28/2/24 by Shreya
const userRoutes = express.Router();

userRoutes.route('/').get(verifyJWT,handleGetAllUsers);

userRoutes.route('/:userId')
    .get(verifyJWT,handleGetUserById)
    .put(verifyJWT,handleUpdateUserById)
    .delete(verifyJWT,handleDeleteUserById);
userRoutes.get('/profile',verifyJWT,handleGetUserProfile); //added this on 27/2/24 by Shreya
// Register a new user
userRoutes.post('/register', handleCreateUser);  //added this on 28/2/24 by Shreya
// Login
userRoutes.post('/login', handleLoginOfUser);  //added this on 28/2/24 by Shreya

// Secured Routes
userRoutes.post('/logout',verifyJWT,handleLogOutOfUser);

userRoutes.put(
  '/update-user',
  verifyJWT,
  // upload.fields([
  //   {
  //     name: "profile_photo",
  //     maxCount: 1
  //   }
  // ]),
  handleUpdateUserFields
  ); //added this on 5/3/24 by Shreya

export default userRoutes;
