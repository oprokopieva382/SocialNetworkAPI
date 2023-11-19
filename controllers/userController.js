const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET a single user by _id and populated thought and friend data
const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId)
      .populate("thoughts")
      .populate("friends");

    user ? res.json(user) : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST a new user
const createUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    const newUser = await User.create({ username, email });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getAllUsers, getSingleUser, createUser };
