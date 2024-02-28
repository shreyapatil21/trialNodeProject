//require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import bodyParser from "body-parser";
dotenv.config({ path: "./env" });
//2nd method for connecting db
connectDB();

import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/FeedbackRoutes.js";
import serviceProviderRoutes from './routes/serviceProviderRoutes.js';
import serviceRequestRoutes from './routes/serviceRequestRoutes.js';
import cookieParser from 'cookie-parser';
import userStoryRoutes from './routes/userStoryRoutes.js';
import express from 'express';
const app = express();

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());
app.use(cookieParser());

//Use routes
<<<<<<< HEAD
=======
app.use('/users', userRoutes);
app.use('/user-stories', userStoryRoutes);
>>>>>>> e85051cc0d065ee6d5f1c7e399b49136cdbc22a9

app.use("/users", userRoutes);
app.use("/service-providers", serviceProviderRoutes);
app.use("/feedback", feedbackRoutes);
>>>>>>>>> Temporary merge branch 2

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


