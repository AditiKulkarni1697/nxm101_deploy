const express = require("express");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.user = decoded.userID;
        console.log(req.body);
        next();
      } else {
        res.end({ msg: "please Login" });
      }
    });
  } else {
    res.send({ msg: "Please Login" });
  }
};

module.exports = {
  auth,
};
