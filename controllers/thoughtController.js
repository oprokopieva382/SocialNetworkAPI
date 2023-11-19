const { ObjectId } = require("mongoose").Types;
const { Reaction, Thought, User } = require("../models");

// GET all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET a single thought by _id
const getSingleThought = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId).populate("reactions");

    thought
      ? res.status(200).json(thought)
      : res.status(404).json({ message: "Thought not found" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST to create a new thought
const createThought = async (req, res) => {
  const { userId, thoughtText, username } = req.body;
  try {
    const newThought = await Thought.create({ thoughtText, username, userId });
    await User.findByIdAndUpdate(userId, {
      $push: { thoughts: newThought._id },
    });
    newThought
      ? res.status(200).json(newThought)
      : res.status(404).json({ message: "Thought not found" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT to update a thought by _id
const updateThought = async (req, res) => {
  const { thoughtId } = req.params;
  const { thoughtText } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true }
    );
    updatedThought
      ? res.status(200).json(updatedThought)
      : res.status(404).json({ message: "Thought not found" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
};
