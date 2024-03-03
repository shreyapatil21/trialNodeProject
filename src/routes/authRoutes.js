import express from 'express';
import { verifyJWT } from '../middleware/authMiddleware.js'
const userRoutes = express.Router();

import {handleCreateUser} from '..controllers/userController.js';
import {handleLoginOfUser} from '..controllers/authController.js';

// Register a new user
userRoutes.post('/register', handleCreateUser);

// Login
userRoutes.post('/login', handleLoginOfUser);

export default userRoutes;
