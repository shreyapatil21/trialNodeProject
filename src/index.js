//require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import bodyParser from "body-parser";
dotenv.config({ path: "./env" });
//2nd method for connecting db
connectDB();

//const userRoutes = require('./routes/userRoutes');
<<<<<<< HEAD
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/FeedbackRoutes.js";
import express from "express";
=======
import userRoutes from './routes/userRoutes.js';
import userStoryRoutes from './routes/userStoryRoutes.js';
import express from 'express';
>>>>>>> e85051cc0d065ee6d5f1c7e399b49136cdbc22a9
const app = express();

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());

//Use routes
<<<<<<< HEAD

app.use("/users", userRoutes);
app.use("/service-providers", serviceProviderRoutes);
app.use("/users", userRoutes);
app.use("/feedback", feedbackRoutes);
=======
app.use('/users', userRoutes);
app.use('/user-stories', userStoryRoutes);
>>>>>>> e85051cc0d065ee6d5f1c7e399b49136cdbc22a9

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

/*
//1st method for connecting db

import express from "express";
const app = express()
//effies 
( async ()=> {
    try {
        await mongoose.connect('${process.env.MONGODB_URL}/${DB_NAME}')
        app.on("error",(error) => {console.log("error",error);})
        app.listen(process.env.PORT, ()=>{console.log("It's listening on port ${process.env.PORT} ");})
    } catch (error) {
        console.error("Error: ",error)
    }
})()
*/
