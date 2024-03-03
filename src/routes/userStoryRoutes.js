// userStoryRoutes.js
import express from 'express';
import { verifyJWT } from '../middleware/authMiddleware.js'
import {
  handleGetAllUserStories,
  handleGetUserStoryById,
  handleCreateUserStory,
  handleUpdateUserStoryById,
  handleUpdateViewCount,
  handleDeleteUserStoryById,
} from '../controllers/userStoryController.js';

const userStoryRoutes = express.Router();

userStoryRoutes.route('/')
  .get(verifyJWT,handleGetAllUserStories)
  .post(verifyJWT,handleCreateUserStory);

userStoryRoutes.route('/:storyId')
  .get(verifyJWT,handleGetUserStoryById)
  .put(verifyJWT,handleUpdateUserStoryById)
  .patch(verifyJWT,handleUpdateViewCount)
  .delete(verifyJWT,handleDeleteUserStoryById);

export default userStoryRoutes;
