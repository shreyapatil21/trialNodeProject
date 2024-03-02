import User from '../models/userModel.js'
import ServiceProvider from '../models/ServiceProviderModel.js';
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
    const users = await User.find();
    console.log(User);
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
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
      console.log("else  user,",role);
      if (role == "Service Provider") {
        console.log("inside service provider");
        const requestData = {
          council_bar_id, categories, skills, edu_back, service_type, service_name,
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
      else{
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
  const userId = req.params.userId;
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

async function handleDeleteUserById(req, res) {
  const userId = req.params.userId;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) return res.status(404).json({ error: "user not found" });
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
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
};
