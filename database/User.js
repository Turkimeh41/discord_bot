const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  _id: String,
  username: String,
  avatarURL: String,
  subscription: {
    GPT4: {
      subbed: Boolean,
      subbedDate: Date,
    },
    midJourney: {
      subbed: Boolean,
      subbedDate: Date,
    },
  },
  joinedAt: Date,
});

module.exports = mongoose.model("Members", memberSchema);
