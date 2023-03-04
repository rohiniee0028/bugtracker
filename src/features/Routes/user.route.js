const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user.model");
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const {email, password } = req.body;
  const passHash = bcrypt.hashSync(password,10);
  try {  
    // let oldUser = await UserModel.findOne({ email });
    // if (oldUser) {
    //   return res.send({ msg: "User already exists" });
    // }
    const newUser = new UserModel({email, password : passHash });
    await newUser.save();
    return res.send("Success");
  } catch (e) {
      return res.send(e);
  }
});

userRouter.post("/login", async (req, res) => {
   const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    const verify = bcrypt.compareSync(password,user.password);
    if (verify) {
       const token = await jwt.sign({email},"secret");
       return res.send({token:token,success:"success"})
      } else {
        return res.send("Invalid Username or Password");
      }
  } catch (e) {
      return res.send(e.message);
  }
});
module.exports = userRouter;
