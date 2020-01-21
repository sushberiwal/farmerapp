const express = require("express");

const userRouter = express.Router();

const { userDetails, updateDetails,getAllUsers,addUser } = require("../controllers/userController");
const {
  login,
  signup,
  protectRoute
} = require("../controllers/authController");
userRouter.route("").get(getAllUsers).post(addUser);
userRouter.route("/login").post(login);
userRouter.route("/signup").post(signup);

userRouter
  .route("/:id")
  .get(userDetails)
  .patch(updateDetails);

module.exports = userRouter;
//farmerDetails()=> farmerController => profile of a farmer
