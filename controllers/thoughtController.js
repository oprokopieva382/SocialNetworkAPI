const { ObjectId } = require("mongoose").Types;
const { Reaction, Thought } = require("../models");

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


module.exports = {
  getAllThoughts,
  getSingleThought,
};