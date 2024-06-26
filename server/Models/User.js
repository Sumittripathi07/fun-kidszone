const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  number: Number,
  dob: Date,
  age: Number,
  startTime: Date,
  adultSocks: Number,
  kidsSocks: Number,
  time: Number,
  paymentMethod: String,
  transactionId: String,
  enterTime: String,
  exitTime: String,
  totalCost: Number,
  currDate: String,
});
module.exports = mongoose.model("kids_master", userSchema);
