// userStoryController.js
import UserStory from '../models/userStoryModel.js';
import { param,body, validationResult } from 'express-validator';

const createStoryValidationRules  = [
  body('user_id').notEmpty().withMessage('User ID is required'),
  body('media_url').notEmpty().withMessage('Media URL is required'),
  body('caption').notEmpty().withMessage('Caption is required'),
  body('date').custom((value) => {
    if (!moment(value, 'DD/MM/YYYY', true).isValid()) {
      throw new Error('Date must be in the format dd/mm/yyyy');
    }
    return true;
  }),
];

const updateStoryValidationRules = [
  body('story_id').notEmpty().withMessage('Story ID is required'),
  body('user_id').notEmpty().withMessage('User ID is required'),
  body('media_url').notEmpty().withMessage('Media URL is required'),
  body('caption').notEmpty().withMessage('Caption is required'),
  body('date')
    .notEmpty().withMessage('Date is required')
    .custom((value) => {
      if (!moment(value, 'DD/MM/YYYY', true).isValid()) {
        throw new Error('Date must be in the format dd/mm/yyyy');
      }
      return true;
    }),
  body('view_count').optional().isInt().withMessage('View count must be an integer'),
];
async function handleGetAllUserStories(req, res) {
  try {
    const userStories = await UserStory.find();
    res.status(200).json(userStories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleGetUserStoryById(req, res) {
  const storyId = req.params.storyId;
  try {
    const userStory = await UserStory.findById(storyId);
    if (!userStory) return res.status(404).json({ error: 'User story not found' });
    return res.json(userStory);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleCreateUserStory(req, res) {
  const body = req.body;
  const {username, email, password, location, firstname, lastname, gender,birth_date,role} = req.body;
  await Promise.all(createStoryValidationRules.map(validation => validation.run(req)));
  
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }

  try {
    const newUserStory = await UserStory.create({
      user_id: body.user_id,
      media_url: body.media_url,
      caption: body.caption,
      date: body.date,
      view_count: 0, 
    });

    res.status(201).json({ message: 'Success! New user story created' });
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' + error });
  }
}

async function handleUpdateUserStoryById(req, res) {
  const storyId = req.params.storyId;
  const body = req.body;
  await Promise.all(createStoryValidationRules.map(validation => validation.run(req)));
  
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }
  try {
    const updateUserStory = await UserStory.findByIdAndUpdate(storyId, {
      story_id: body.story_id,
      user_id: body.user_id,
      media_url: body.media_url,
      caption: body.caption,
      date: body.date,
      view_count: body.view_count || 0, 
    });
    if (!updateUserStory) return res.status(404).json({ error: 'User story not found' });
    return res.json(updateUserStory);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleDeleteUserStoryById(req, res) {
  const storyId = req.params.storyId;
  try {
    const deleteUserStory = await UserStory.findByIdAndDelete(storyId);
    if (!deleteUserStory) return res.status(404).json({ error: 'User story not found' });
    return res.json({ message: 'User story deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export {
  handleGetAllUserStories,
  handleGetUserStoryById,
  handleCreateUserStory,
  handleUpdateUserStoryById,
  handleDeleteUserStoryById,
};
