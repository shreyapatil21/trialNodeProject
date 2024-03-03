// routes/FeedbackRoutes.js

import express from "express";
import { verifyJWT } from '../middleware/authMiddleware.js'
import {
    handleGetAllFeedback,
    handleGetFeedbackById,
    handleCreateFeedback,
    handleUpdateFeedbackIsDeletedStatus,
} from "../controllers/FeedbackController.js";

const router = express.Router();

// Route to get all feedback
router.get("/", handleGetAllFeedback);

// Route to get a specific feedback by ID
router.get("/:feedbackId", handleGetFeedbackById);

// Route to create a new feedback
router.post("/", handleCreateFeedback);

// Route to update delete status of feedback
router.post("/:feedbackId/:newStatus", handleUpdateFeedbackIsDeletedStatus);
export default router;
