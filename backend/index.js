const express = require("express");
const { connection } = require("./main");
const { exist } = require("./Middlewares/alreadyExist");
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/userRouter");
const { postRouter } = require("./routes/postRoutes");
const { auth } = require("./Middlewares/authentication");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

//app.use(exist);

app.use("/user", userRouter);

app.use(auth);

app.use("/posts", postRouter);

//app.use(auth);

//app.use("/posts", postRouter);

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("err.message");
  }
  console.log(`Server running at port ${process.env.port}`);
});
