//require('dotenv').config({path: './env'})
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
dotenv.config({ path: './env' });
//2nd method for connecting db
connectDB()


//const userRoutes = require('./routes/userRoutes');
import userRoutes from './routes/userRoutes.js';
import express from 'express';
const app = express();
app.use(express.json());

//Use routes
app.use('/users', userRoutes);

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


