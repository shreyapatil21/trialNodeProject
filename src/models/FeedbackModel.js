// models/FeedbackModel.js

import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    feedback_id: {
        type: Number,
        // required: true,
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    sp_user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ServiceProvider' 
    },
    rating: {
        type: Number,
        required: true,
    },
    comments: String,
    feedback_date: {
        type: Date,
        required: true,
    },
    user: {
        type: Number,
        // required: true,
    },
    is_deleted: {
        type: Boolean,
        default: true // Default value set to true
      }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
