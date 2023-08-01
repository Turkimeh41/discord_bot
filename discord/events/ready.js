require("dotenv").config();
const clientReadyEvent = async (bot) => {
  console.log("😊 i'm online!");
};

module.exports.clientReadyEvent = clientReadyEvent;
