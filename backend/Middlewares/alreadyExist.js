const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const exist = async (req, res, next) => {
  if (req.method == "POST" && req.url == "/user/register") {
    const database = await UserModel.find();
    database.forEach((ele) => {
      if (ele.email === req) {
        res.send("User already exist, please log in");
      }
    });
    next();
  } else {
    next();
  }
};

module.exports = {
  exist,
};
