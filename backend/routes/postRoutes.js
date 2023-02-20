const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../models/postModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

postRouter.get("/", async (req, res) => {
  try {
    const userID = req.body;
    const posts = await PostModel.find();
    res.send(posts);
  } catch (err) {
    res.send(err);
  }
});

postRouter.post("/post", async (req, res) => {
  try {
    const payload = req.body;
    const post = new PostModel(payload);
    await post.save();
    res.send({ msg: "note is created" });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = {
  postRouter,
};
