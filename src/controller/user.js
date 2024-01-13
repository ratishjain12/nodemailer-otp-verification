const User = require("../models/user");
const Otpverification = require("../models/otpverification");

const handleSignUp = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.json({ error: "Please Enter All Details" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ error: "User already exists with this email" });
  } else {
    //signup process
  }
};
const handleOTPVerifcation = async (req, res) => {};
const handleOTPResend = async (req, res) => {};

module.exports = {
  handleSignUp,
  handleOTPVerifcation,
  handleOTPResend,
};
