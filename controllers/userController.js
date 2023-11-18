const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { getAllUsers };