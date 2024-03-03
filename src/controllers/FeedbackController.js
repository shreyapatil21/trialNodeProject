// controllers/FeedbackController.js

import Feedback from "../models/FeedbackModel.js";
import jwt from "jsonwebtoken"
async function handleGetAllFeedback(req, res) {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decoded.role == "Service Provider") {
        try {
            const sp_user_id = decoded._id;
            const feedbacks = await Feedback.find({ sp_user_id });
            return res.status(200).json(feedbacks);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

    } else if (decoded.role == "Admin") {
        try {
            const feedbacks = await Feedback.find();
            return res.status(200).json(feedbacks);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }else if (decoded.role == "Client") {
        try {
            const user_id = decoded._id;
            const feedbacks = await Feedback.find({ user_id });
            return res.status(200).json(feedbacks);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
  
    } else {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
}

async function handleGetFeedbackById(req, res) {
    const feedbackId = req.params.feedbackId;
    try {
        const feedback = await Feedback.findById(feedbackId);
        if (!feedback)
            return res.status(404).json({ error: "Feedback not found" });
        return res.json(feedback);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleCreateFeedback(req, res) {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const currentDate = new Date();
    const body = req.body;
    console.log("appointment body: ",body);
    const {sp_user_id, rating, comments} = req.body;
    const errors = [];

    // Iterate over the keys and check if any value is empty
    Object.entries({ sp_user_id, rating, comments }).forEach(([key, value]) => {
        if (!value || value.trim() === '') {
            errors.push(`${key} cannot be empty`);
        }
    });

    // Check if any errors occurred
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    try {
        const newFeedback = await Feedback.create({
            user_id: decoded._id,
            sp_user_id,
            rating,
            comments,
            feedback_date:currentDate
        });
        res.status(201).json({
            message: "Success! New feedback created",
            feedback: newFeedback,
        });
    } catch (error) {
        res.status(400).json({ error: "Bad Request" + error });
    }
}
async function handleUpdateFeedbackIsDeletedStatus(req,res) {
    const feedbackId = req.params.feedbackId;
    const newStatus = req.params.newStatus;
    try {
      // Find the feedback by feedbackId and update the is_deleted field
      const updatedFeedback = await Feedback.findOneAndUpdate(
        { _id: feedbackId }, // Query for the feedback by its _id
        { $set: { is_deleted: newStatus } }, // Set the new value for is_deleted
        { new: true } // Return the updated document
      );
  
      if (updatedFeedback) {
        console.log('Feedback is_deleted status updated:', updatedFeedback);
        return updatedFeedback;
      } else {
        console.log('Feedback not found');
        return null;
      }
    } catch (error) {
      console.error('Error updating feedback is_deleted status:', error);
      throw error;
    }
  }
export { handleGetAllFeedback, handleGetFeedbackById, handleCreateFeedback ,handleUpdateFeedbackIsDeletedStatus};
