const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  try {
    const database = await UserModel.find();
    res.send(database);
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  const database = await UserModel.find({ email });
  console.log(database);

  try {
    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) {
        res.send(err.message);
      } else {
        const user = new UserModel({
          name,
          email,
          gender,
          password: hash,
          age,
          city,
        });
        await user.save();
        res.send("user added");
      }
    });
  } catch (err) {
    res.send(err.message);
    console.log(error);
  }
});

userRouter.patch("/updateuser/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    const query = await UserModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send("user updated");
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    console.log(user);
    if (user.length != 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        console.log(result);
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai", {
            expiresIn: "1hr",
          });
          res.send({ msg: "Log in successful", token: token });
        } else {
          res.send(err);
        }
      });
    } else {
      res.send({ msg: "wrong credentials" });
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = {
  userRouter,
};
