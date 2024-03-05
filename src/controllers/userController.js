import User from '../models/userModel.js'
import ServiceProvider from '../models/ServiceProviderModel.js';
import ServiceRequest from '../models/serviceRequestModel.js';
import jwt from 'jsonwebtoken';
import { upload } from '../middleware/multerMiddleware.js';
import {uploadOnCloudinary} from '../utils/Cloudinary.js';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { param, body, validationResult } from 'express-validator';
const url = "http://localhost:8000/service-providers/";
const createUserValidationRules = [
  body('username').trim().notEmpty().isAlpha().withMessage('Username is required'),
  body('email').trim().isEmail().withMessage('Invalid email'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('location').optional().trim().notEmpty().isAlpha().isLength({ min: 3 }).withMessage('Location is required'),
  body('firstname').optional().trim().notEmpty().isAlpha().isLength({ min: 3 }).withMessage('Firstname is required'),
  body('lastname').optional().trim().notEmpty().isAlpha().isLength({ min: 3 }).withMessage('Lastname is required'),
  body('gender').optional().trim().notEmpty().isAlpha().isIn(['male', 'female']).withMessage('Gender is required'),
  // console.log(body('birth_date')),
  //   body('birth_date').optional({ nullable: true }).trim().custom((value) => {
  //     if (value && !moment(value, 'DD-MM-YYYY', true).isValid()) {
  //         throw new Error('Birth date must be in the format DD-MM-YYYY');
  //     }
  //     return true;
  // }).withMessage('Birth date is invalid'),
];

const updateUserValidationRules = [
  // param('userId').isNumeric().withMessage('User ID must be a valid number'),
  body('username').optional().trim().notEmpty().isAlpha().isLength({ min: 3 }).withMessage('Username is required'),
  body('email').optional().trim().isEmail().withMessage('Invalid email'),
  body('password').optional().trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('location').optional().trim().notEmpty().isAlpha().isLength({ min: 3 }).withMessage('Location is required'),
  body('firstname').optional().trim().notEmpty().isAlpha().isLength({ min: 3 }).withMessage('Firstname is required'),
  body('lastname').optional().trim().notEmpty().isAlpha().isLength({ min: 3 }).withMessage('Lastname is required'),
  body('gender').optional().trim().notEmpty().isAlpha().isIn(['male', 'female']).withMessage('Gender is required'),
  // body('birth_date').optional().trim().notEmpty().custom((value) => {
  //   if (!moment(value, 'DD/MM/YYYY', true).isValid()) {
  //     console.log(('Birth date must be in the format dd/mm/yyyy: ',value));
  //     throw new Error('Birth date must be in the format dd/mm/yyyy: ',value);
  //   }
  //   return true;
  // }).withMessage('Birth date is required'),
  body('role').optional().trim().notEmpty().isIn(['Client', 'Service Provider', 'Admin']).withMessage('Role is required'),
];

async function handleGetAllUsers(req, res) {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    if (decoded.role === "Service Provider") {
      console.log("inside users get,",decoded._id);
      const result = await ServiceRequest.aggregate([
        {
          $match: { sp_user_id: decoded._id } // Match specific sp_user_id
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id", // Field in ServiceRequest
            foreignField: "_id", // Field in users
            as: "matchedDocuments"
          }
        },
        {
          $unwind: "$matchedDocuments"
        },
        {
          $project: {
            _id: 0, // Exclude _id field if not needed
            "matchedDocuments": 1 // Include all attributes of matchedDocuments
          }
        }
      ]);

      
      console.log("result: ",result);
      res.status(200).json(result);
    }else if (decoded.role === "Admin") {
      try {
        const users = await User.find();
        return res.status(200).json(users);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleGetUserById(req, res) {
  const userId = req.params.userId;
  try {
    const newUser = await User.findById(userId);
    if (!newUser) return res.status(404).json({ error: "user not found" });
    return res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleCreateUser(req, res) {
  // Remove password field from response
  // Get user from frontend
  console.log(req.body);
  const { username, email, password, location, firstname, lastname, gender, birth_date, role,
    council_bar_id, categories, skills, edu_back, service_type, service_name,
    experience_years } = req.body;
  console.log("DOB: ", req.body.birth_date);
  await Promise.all(createUserValidationRules.map(validation => validation.run(req)));

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }

  // Check if user already exist: username/email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })
  if (existedUser) { return res.status(409).json({ message: "User with this username or email already exists." }) }
  // Create a user object (newUser) - create entry in db
  try {
    // const hashPassword = await bcrypt.hash(password, 10); //this line added- generally not needed
    const newUser = await User.create({
      username,
      email,
      password, //this line changed
      location,
      firstname,
      lastname,
      gender,
      birth_date,
      role
    });
    //newUser.save();  //this line added
    // Check for user creation 
    console.log("newUser: ", newUser);
    if (!newUser) {
      // If user not found after creation, something went wrong
      console.log("not user");
      return res.status(500).json({ error: 'User creation failed' });
    } else {
      // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("else  user,", role);
      if (role == "Service Provider") {
        console.log("inside service provider");
        const _id = newUser;
        const requestData = {
          _id, council_bar_id, categories, skills, edu_back, service_type, service_name,
          experience_years
        }
        try {
          const newServiceProvider = await ServiceProvider.create(requestData);
          return res.status(201).json({
            message: "Success! New service provider created",
            serviceProvider: newServiceProvider,
          });
        } catch (error) {
          // const deleteUser = await User.findByIdAndDelete(newUser);
          return res.status(400).json({ error: "Bad Request" + error });
        }
        // axios.post(url, requestData)
        //   .then(response => {
        //     console.log(response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error:', error);
        //   });
      }
      else {
        console.log("else service provider");
      }
    }
    // Return response
    return res.status(201).json({ message: "User registered Successfully!" });
  } catch (error) {
    return res.status(400).json({ error: 'Server Bad Request' + error });
  }
}

async function handleUpdateUserById(req, res) {
  //const userId = req.params.userId;
  const userId = req.user?._id;
  const body = req.body;
  await Promise.all(updateUserValidationRules.map(validation => validation.run(req)));

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }
  try {
    const updateUser = await User.findByIdAndUpdate(userId, {
      username: body.username,
      email: body.email,
      password: body.password,
      location: body.location,
      firstname: body.firstname,
      lastname: body.lastname,
      gender: body.gender,
    });
    if (!updateUser) return res.status(404).json({ error: "user not found" });
    return res.json(updateUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleUpdateUserFields(req, res) {
  const {location, firstname, lastname} = req.body;
  const userId = req.params.userId;
  await Promise.all(updateUserValidationRules.map(validation => validation.run(req)));

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }
  try {
    const updateUser = await User.findByIdAndUpdate(userId, {
      $set: {
        location,
        firstname,
        lastname,
      }
    });
    if (!updateUser) return res.status(404).json({ error: "user not found" });
    return res.json(updateUser);
  } catch (error) {
    res.status(500).json({ error: 'Error while updating user fields' });
  }
}

async function changeCurrentPassword(req, res) {
  const {oldPassword, newPassword} = req.body;
    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      return res.status(400).json( {error: "Invalid old password"} );
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});
}

async function getCurrentUser (req, res) {
  return res
  .status(200)
  .json( {message : "User fetched successfully"} );
}

async function handleDeleteUserById(req, res) {
  const userId = req.params.userId;
  const newStatus = req.params.newstatus
  try {
    // Find the user by userId and update the is_blocked field
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId }, // Query for the user by their _id
      { $set: { is_blocked: newStatus } }, // Set the new value for is_blocked
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      console.log('User blocked status updated:', updatedUser);
      return res.status(200).json({ msg: updatedUser});
    } else {
      console.log('User not found');
      return res.status(404).json({ error: "user not found" });;
    }
  } catch (error) {
    console.error('Error updating user blocked status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleGetUserProfile(req, res) {
  try {

    const user = await User.findById(req.userId);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserById,
  handleDeleteUserById,
  handleGetUserProfile,
  changeCurrentPassword,
  handleUpdateUserFields
};
