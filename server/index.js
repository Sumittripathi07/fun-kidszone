const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

require("./db/connection");
const Users = require("./Models/User");

app.post("/", async (req, res) => {
  let user = new Users(req.body);
  let result = await user.save();
  res.send(result);
});
app.get("/allKids", async (req, res) => {
  let d = new Date();
  let currDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;

  let result = await Users.find({ currDate: currDate });
  res.send(result);
});

app.get("/adminKids", async (req, res) => {
  let result = await Users.find();
  let totalAmount = await Users.aggregate([
    { $group: { _id: null, sum_val: { $sum: "$valueField" } } },
  ]);

  let cashAmount = await Users.aggregate([
    { $match: { paymentMethod: "cash" } },
    { $group: { _id: null, total: { $sum: "$totalCost" } } },
  ]);
  let upiAmount = await Users.aggregate([
    { $match: { paymentMethod: "upi" } },
    { $group: { _id: null, total: { $sum: "$totalCost" } } },
  ]);

  res.send({
    result: result,
    totalAmount: totalAmount,
    cashAmount: cashAmount,
    upiAmount: upiAmount,
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
