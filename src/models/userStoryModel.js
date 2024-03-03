// userStoryModel.js
import mongoose from 'mongoose';

const userStorySchema = new mongoose.Schema({
  story_id: { type: Number, 
    // required: true 
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  media_url: { type: String, required: true },
  caption: { type: String, required: true },
  date: { type: Date, required: true },
  view_count: { type: Number, default: 0 }, 
});

const UserStory = mongoose.model('user_story', userStorySchema);

export default UserStory;
