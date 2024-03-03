// userStoryController.js
import UserStory from '../models/userStoryModel.js';
import { param,body, validationResult } from 'express-validator';

const createStoryValidationRules  = [
  body('media_url').notEmpty().withMessage('Media URL is required'),
  body('caption').notEmpty().withMessage('Caption is required'),
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
  const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
  if(decoded.role == "Service Provider"){
    try {
      const sp_user_id = decoded._id;
      const userStories = await UserStory.find({ sp_user_id});
      return res.status(200).json(userStories);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

  }else if(decoded.role == "Admin"){
    try {
      const userStories = await UserStory.find();
      return res.status(200).json(userStories);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }else{
    return res.status(401).json({ error: 'Unauthorized Access' });
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
  const {media_url,caption} = req.body;

  //validation
  const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  await Promise.all(createStoryValidationRules.map(validation => validation.run(req)));
  
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }

  const id=decoded._id;
  const currentDate = new Date();
  try {
    const newUserStory = await UserStory.create({
      
      user_id: id,
      media_url: body.media_url,
      caption: body.caption,
      date: currentDate,
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
  await Promise.all(updateStoryValidationRules.map(validation => validation.run(req)));
  
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

async function handleUpdateViewCount(req,res){
  const storyId = req.params.storyId;
  const updatedUserStory = await UserStory.findOneAndUpdate(
    { _id: storyId}, // Query for the specific document by its _id
    { $inc: { view_count: 1 } }, // Use $inc to increment the view_count field by 1
    { new: true } // Set { new: true } to return the updated document
  );

  console.log('Updated UserStory:', updatedUserStory);
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
  handleUpdateViewCount,
  handleDeleteUserStoryById,
};
