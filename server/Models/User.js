const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  number: Number,
  dob: Date,
  startTime: Date,
  adultSocks: Number,
  kidsSocks: Number,
  gender: String,
  paymentMethod: String,
  transactionId: String,
});
module.exports = mongoose.model("users", userSchema);
