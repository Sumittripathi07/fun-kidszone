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

app.post("/updateKid", async (req, res) => {
  const {id, name,number,time,adultSocks,kidsSocks,paymentMethod,transactionId,totalCost} = req.body
  let result = await Users.updateOne({_id:id},{
    $set:{
      name:name,
      number:number,
      time:time,
      adultSocks:adultSocks,
      kidsSocks:kidsSocks,
      paymentMethod:paymentMethod,
      transactionId:transactionId,
      totalCost:totalCost,
    }
 } );
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
    { $group: { _id: null, total: { $sum: "$totalCost" } } },
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
