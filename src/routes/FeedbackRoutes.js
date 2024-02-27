// routes/FeedbackRoutes.js

import express from "express";
import {
    handleGetAllFeedback,
    handleGetFeedbackById,
    handleCreateFeedback,
} from "../controllers/FeedbackController.js";

const router = express.Router();

// Route to get all feedback
router.get("/", handleGetAllFeedback);

// Route to get a specific feedback by ID
router.get("/:feedbackId", handleGetFeedbackById);

// Route to create a new feedback
router.post("/", handleCreateFeedback);

export default router;
