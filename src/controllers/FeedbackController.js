// controllers/FeedbackController.js

import Feedback from "../models/FeedbackModel.js";

async function handleGetAllFeedback(req, res) {
    try {
        const feedback = await Feedback.find();
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
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
    const body = req.body;
    try {
        const newFeedback = await Feedback.create(body);
        res.status(201).json({
            message: "Success! New feedback created",
            feedback: newFeedback,
        });
    } catch (error) {
        res.status(400).json({ error: "Bad Request" + error });
    }
}

export { handleGetAllFeedback, handleGetFeedbackById, handleCreateFeedback };
