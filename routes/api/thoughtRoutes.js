const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

///api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

///api/users/:userId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

///api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
