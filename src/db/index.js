import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
URL="mongodb://localhost:27017/db"
const connectDB = async () =>mongoose
.connect(`${process.env.MONGODB_URL}/${DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected..."))
.catch((err) => console.log("MongoDB error", err));


export default connectDB;
// we can also write module.exports = {connectDB};

// mongoose.connect(process.env.MONGODB_URL/)
