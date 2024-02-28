import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

async function verifyJWT (req, res, next) {
  const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ","");
  //const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //'your_secret_key'
    const user = await User.findById(decoded?._id).select("-password");
    if(!user) {return res.status(401).json({ error: "Invalid access token" })}
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid access token' });
  }
}

export  { verifyJWT };
