const express = require("express");
const router = express.Router();
const {
  handleSignUp,
  handleOTPVerifcation,
  handleOTPResend,
} = require("../controller/user");

router.post("/signup", handleSignUp);

router.post("/verifyotp", handleOTPVerifcation);

router.post("/resendotp", handleOTPResend);

module.exports = router;
