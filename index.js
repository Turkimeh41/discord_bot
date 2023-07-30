const { initClient, getClient } = require("./discord/client");
const client = getClient();
const db = require("./database/database");

//EVENTS ROUTES
const ready = require("./discord/events/ready");
const interaction = require("./discord/events/interactions");
const guildMember = require("./discord/events/guild-member");

async function initApp() {
  //First we initilize Our mongoDB connection so the bot can start adding people to the database
  console.log("Connection to MongoDB...");
  try {
    await db.connectToMongoDB();
    //initilize the Bot
    await initClient();
  } catch (err) {
    console.log(err);
  }
}
initApp();

client.on("ready", ready.clientReadyEvent);

client.on("interactionCreate", interaction.interactionEvent);

client.on("guildMemberAdd", guildMember.memberAddEvent);

client.on("guildMemberRemove", guildMember.memberRemoveEvent);
