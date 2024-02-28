// userStoryController.js
import UserStory from '../models/userStoryModel.js';

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
  if (!body || !body.story_id || !body.user_id || !body.media_url || !body.caption || !body.date) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newUserStory = await UserStory.create({
      story_id: body.story_id,
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
