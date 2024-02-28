// models/FeedbackModel.js

import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    feedback_id: {
        type: Number,
        required: true,
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
        required: true,
    },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
