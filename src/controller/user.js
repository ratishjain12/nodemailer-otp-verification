const User = require("../models/user");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Otpverification = require("../models/UserOTPVerification");
const otpgen = require("../utils/otpgenerator");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.USER_EMAIL,
    pass: "hwsz cqfm hydh omzn",
  },
});

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
    let saltRounds = 10;
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .then(async (hash) => {
        const user = await User.create({
          name: name,
          email: email,
          password: hash.toString(),
        });

        sendOTPVerificationEmail(user, res);
      })
      .catch((err) => console.error(err.message));
  }
};
const handleOTPVerifcation = async (req, res) => {};
const handleOTPResend = async (req, res) => {};

const sendOTPVerificationEmail = async ({ _id, email }, res) => {
  const otp = otpgen();
  try {
    const mailOptions = {
      from: '"Ratish Jain" <ratishjain6@gmail.com>',
      to: email,
      subject: "otp verification",
      text: "OTP VERIFICATION",
      html: `OTP: <b>${otp}</b>`,
    };

    let saltRounds = 10;
    const hashOTP = await bcrypt.hash(otp, saltRounds);
    await Otpverification.create({
      userId: _id,
      otp: hashOTP.toString(),
      createdAt: Date.now(),
      expiresAt: Date.now() + 60000,
    });

    await transporter.sendMail(mailOptions);
    res.json({ status: "pending", message: "Otp is not verified!!" });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};
module.exports = {
  handleSignUp,
  handleOTPVerifcation,
  handleOTPResend,
};
