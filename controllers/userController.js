const { User, Thought } = require("../models");

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
      .populate("friends")
      .select("-__v");

    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
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

// PUT to update a user by _id
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { runValidators: true, new: true }
    );
    updatedUser
      ? res.status(200).json(updatedUser)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE to remove user by _id
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Remove a user's associated thoughts when deleted
    await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
    res.status(200).json({
      message: "User and associated thoughts deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST to add a new friend to a user's friend list
const addFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );
    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE to remove a friend from a user's friend list
const deleteFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );
    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
};
