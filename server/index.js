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
  let result = await Users.find();
  res.send(result);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
