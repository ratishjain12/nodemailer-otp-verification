const mongoose = require("mongoose");

function connectDB(host) {
  return mongoose.connect(host);
}

module.exports = connectDB;
