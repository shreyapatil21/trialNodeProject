import User from '../models/userModel.js'
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
  const body = req.body;
  console.log(body);
  if(
    !body || 
    !body.username || 
    !body.email || 
    !body.password || 
    !body.location || 
    !body.firstname || 
    !body.lastname || 
    !body.gender){
      return res.status(400).json({message: "All fields are required."});
    }
  try {
    const newUser = await User.create({ 
      username: body.username, 
      email: body.email, 
      password: body.password, 
      location: body.location, 
      firstname: body.firstname, 
      lastname: body.lastname, 
      gender: body.gender,
    });
    console.log("newUser: " ,newUser);
    if (!newUser) {
      // If user not found after creation, something went wrong
      return res.status(500).json({ error: 'User creation failed' });
  }

    res.status(201).json({message: "success! new user created"});
  } catch (error) {
    res.status(400).json({ error: 'Bad Request'+error });
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

export { 
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserById,
  handleDeleteUserById
};
