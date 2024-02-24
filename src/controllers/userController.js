const User = require('../models/userModel.js');

// Example controller methods
exports.handeleGetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.handeleCreateUser = async (req, res) => {
  const { username, email, password, location, name, gender } = req.body;
  try {
    const newUser = await User.create({ username, email, password, location, name, gender });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

exports.handeleGetUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const newUser = await User.findById(userId);
        if(!newUser) return res.status(404).json({ error: "user not found"});
        return res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.handeleUpdateUserById = async (req, res) => {
    const userId = req.params.userId;
    const { username, email, password, location, name, gender } = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(userId,{username, email, password, location, name, gender},{new: true});
        if(!updateUser) return res.status(404).json({ error: "user not found"});
        return res.json(updateUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.handeleDeleteUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deleteUser = await User.findByIdAndUpdate(userId);
        if(!deleteUser) return res.status(404).json({ error: "user not found"});
        return res.json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};