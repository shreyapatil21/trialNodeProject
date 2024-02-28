import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';
async function handleGetAllUsers(req, res){
  try {
    const users = await User.find();
    console.log(User);
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleGetUserById(req, res){
    const userId = req.params.userId;
    try {
        const newUser = await User.findById(userId);
        if(!newUser) return res.status(404).json({ error: "user not found"});
        return res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleCreateUser(req, res){
  // Remove password field from response
  // Get user from frontend
  const {username, email, password, location, firstname, lastname, gender,birth_date,role} = req.body;
  // validation
  if([username,email,password,location,firstname,lastname,gender, birth_date,role].some((field)=>
    field?.trim() === "")
    ){
      res.status(400).json({ message: "All fields are required." });
    }
    // Check if user already exist: username/email
    const existedUser = await User.findOne({
      $or: [{ username },{ email }]
    })
    if(existedUser){return res.status(409).json({ message: "User with this username or email already exists." })}
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
    console.log("newUser: " ,newUser);
    if (!newUser) {
      // If user not found after creation, something went wrong
      return res.status(500).json({ error: 'User creation failed' });
  }
    // Return response
    return res.status(201).json({message: "User registered Successfully!"});
  } catch (error) {
    res.status(400).json({ error: 'Server Bad Request'+error });
  }
}

async function handleUpdateUserById  (req, res) {
    const userId = req.params.userId;
    const body = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(userId,{
          username: body.username, 
          email: body.email, 
          password: body.password, 
          location: body.location, 
          firstname: body.firstname, 
          lastname: body.lastname, 
          gender: body.gender,});
        if(!updateUser) return res.status(404).json({ error: "user not found"});
        return res.json(updateUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleDeleteUserById(req, res)  {
    const userId = req.params.userId;
    try {
        const deleteUser = await User.findByIdAndDelete(userId);
        if(!deleteUser) return res.status(404).json({ error: "user not found"});
        return res.json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleGetUserProfile(req,res) {
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
