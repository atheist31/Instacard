const UserModel = require("../models/userModel");
const sendToken = require("../middlewares/jwtToken");

exports.registerUser = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();

    sendToken(user, 201, res);
  } catch (error) {
    res.send({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please enter login credentials");
  }
  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) return res.status(401).send({ msg: "User doesn't exist" });

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect)
      return res
        .status(401)
        .send({ msg: "Please enter correct email or password" });

    sendToken(user, 200, res);
  } catch (error) {
    res.status(501).send({ error });
  }
};

//logoutUser
exports.logoutUser = async (req, res) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .send({ success: true, message: "Logged out successfully." });
  } catch (error) {
    res.status(501).send({ error });
  }
};

// get user details
exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);

    res.status(200).send({ success: true, user });
  } catch (error) {
    res.status(501).send({ error });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).send({ success: true, users });
  } catch (error) {
    res.status(501).send({ error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user)
      return next(
        new ErrorHandler(`User doesn't exist with Id: ${req.params.id}`)
      );

    res.status(200).send({ success: true, user });
  } catch (error) {
    res.status(501).send({ error });
  }
};
