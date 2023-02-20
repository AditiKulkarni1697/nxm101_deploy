const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  devide: { type: String, require: true },
  no_of_comments: { type: String, require: true },
  user: { type: String, require: true },
});

const PostModel = mongoose.model("post", postSchema);

module.exports = {
  PostModel,
};
