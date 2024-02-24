import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
URL="mongodb://localhost:27017/db"
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\nMongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection failed", error);
        process.exit(1);
    }
}

export default connectDB;
// we can also write module.exports = {connectDB};

// mongoose.connect(process.env.MONGODB_URL/)
