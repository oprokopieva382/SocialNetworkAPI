const {Thought, User } = require("../models");

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
      { runValidators: true, new: true }
    );
    updatedThought
      ? res.status(200).json(updatedThought)
      : res.status(404).json({ message: "Thought not found" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE to remove thought by _id
const deleteThought = async (req, res) => {
  const { thoughtId } = req.params;

  try {
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    // Remove the thought's _id from the associated user's thoughts array field
    await User.findOneAndUpdate(
      { thoughts: thoughtId },
      {
        $pull: { thoughts: thoughtId },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Thoughts deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST to create a reaction stored in a single thought's reactions array field
const createReaction = async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    );
    updatedThought
      ? res.status(200).json(updatedThought)
      : res.status(404).json({ message: "Thought  not found" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE to pull and remove a reaction by the reaction's reactionId value
const removeReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
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
  deleteThought,
  createReaction,
  removeReaction,
};
