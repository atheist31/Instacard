const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");
const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/logout", logoutUser);
UserRouter.get("/details", isAuthenticatedUser, getUserDetails);
UserRouter.get(
  "/all",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsers
);
UserRouter.get(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getUserById
);

module.exports = UserRouter;
