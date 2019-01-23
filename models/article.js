const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  user: {type: String, required: true},
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  byline: { type: String, required: false},
  url: { type: String, required: true }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
