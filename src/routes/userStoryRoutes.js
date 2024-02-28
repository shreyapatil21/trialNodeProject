// userStoryRoutes.js
import express from 'express';
import {
  handleGetAllUserStories,
  handleGetUserStoryById,
  handleCreateUserStory,
  handleUpdateUserStoryById,
  handleDeleteUserStoryById,
} from '../controllers/userStoryController.js';

const userStoryRoutes = express.Router();

userStoryRoutes.route('/')
  .get(handleGetAllUserStories)
  .post(handleCreateUserStory);

userStoryRoutes.route('/:storyId')
  .get(handleGetUserStoryById)
  .put(handleUpdateUserStoryById)
  .delete(handleDeleteUserStoryById);

export default userStoryRoutes;
