//require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config({ path: "./env" });

//2nd method for connecting db
connectDB();

import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/FeedbackRoutes.js";
import serviceProviderRoutes from './routes/serviceProviderRoutes.js';
import serviceRequestRoutes from './routes/serviceRequestRoutes.js';
import cookieParser from 'cookie-parser';
import userStoryRoutes from './routes/userStoryRoutes.js';
import appointmentRoutes from "./routes/appointmentRoutes.js";
import express from 'express';
const app = express();
import { upload } from './middleware/multerMiddleware.js';
// app.use(upload.fields([
//     { name: 'avatar', maxCount: 1 }
//   ]));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
//Use routes

app.use(
    cors({
        credentials: true,
        origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    })
);
app.use('/user-stories', userStoryRoutes);
app.use("/users", userRoutes);
app.use("/service-providers", serviceProviderRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/service-req",serviceRequestRoutes);
app.use("/appointment",appointmentRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


