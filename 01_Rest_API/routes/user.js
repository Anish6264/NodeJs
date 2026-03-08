const expreess = require("express");
const router = expreess.Router();
const {
  handleGetAllUsers,
  handelGetUserById,
  handelUpdateUserById,
  handelDeleteUserById,
  handelCreateNewUser,
} = require("../controllers/user");

router
.route("/")
.get( handleGetAllUsers)
.post(handelCreateNewUser);
router
  .route("/:id")
  .get(handelGetUserById)
  .patch( handelUpdateUserById)
  .delete(handelDeleteUserById);

module.exports = router