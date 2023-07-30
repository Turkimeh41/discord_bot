const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  _id: String,
  username: String,
  avatarURL: String,
  //Type of subscription none, ChatGPT or MidJourney or both chatGPT and MidJourney
  subscription: Number,
  joinedAt: Date,
});

module.exports = mongoose.model("Members", memberSchema);
