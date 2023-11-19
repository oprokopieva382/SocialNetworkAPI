const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// BONUS: Remove a user's associated thoughts when deleted
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
