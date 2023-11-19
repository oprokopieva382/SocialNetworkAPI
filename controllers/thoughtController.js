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