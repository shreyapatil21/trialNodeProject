//require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import bodyParser from "body-parser";
dotenv.config({ path: "./env" });
//2nd method for connecting db
connectDB();

//const userRoutes = require('./routes/userRoutes');
<<<<<<< HEAD
import userRoutes from './routes/userRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import express from 'express';

=======
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/FeedbackRoutes.js";
import express from "express";
>>>>>>> 9bc3a904124f9a9fbdd837284ab6d6471b5b93aa
const app = express();

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());

//Use routes
<<<<<<< HEAD

app.use("/users", userRoutes);
app.use("/service-providers", serviceProviderRoutes);
=======
app.use("/users", userRoutes);
app.use("/feedback", feedbackRoutes);
>>>>>>> 9bc3a904124f9a9fbdd837284ab6d6471b5b93aa

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
