const { getClient } = require("../client");
const { verifactionWidget } = require("../utils/buttons");
const client = getClient();
require("dotenv").config();
const User = require("../../database/User");

const clientReadyEvent = async (bot) => {
  console.log("😊 i'm online!");
};

module.exports.clientReadyEvent = clientReadyEvent;
