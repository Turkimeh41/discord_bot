/* const mysql = require('mysql2');

const pool = mysql.createPool({database:"sys",});
 */
const { Timestamp } = require("mongodb/lib/bson");
const User = require("./User");
const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  //we use mongoose driver to connect to our database, mongoose is basically an ORM Mapping that controls with most functionalities like adding, querying, deleting and etc
  await mongoose.connect("mongodb://localhost:27017/Chat_Bot_DiscordSERVER");
};

const addMember = async (id, username, avatarURL) => {
  console.log("a New member joined!, adding him to mongo Database...");
  const user = new User({
    _id: id,
    username: username,
    avatarURL: avatarURL,
    subscription: { GPT4: { subbed: false, subbedDate: null }, midJourney: { subbed: false, subbedDate: null } },
    subscribed: 0,
    joinedAt: Date.now(),
  });
  await user.save();
  console.log("Added!");
};

const removeMember = async (id) => {
  console.log(id);
  await User.deleteOne({ _id: id });
};
module.exports.connectToMongoDB = connectToMongoDB;

module.exports.addMember = addMember;
module.exports.removeMember = removeMember;
