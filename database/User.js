const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  _id: String,
  username: String,
  avatarURL: String,
  subscription: Boolean,
  subscribed: Number,
  joinedAt: Date,
});

module.exports = mongoose.model("Members", memberSchema);
