const { Client, IntentsBitField } = require("discord.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildPresences,
  ],
});

const initClient = async () => {
  try {
    console.log("Logging in discord bot...");
    //Bot Becomes ONLINE
    console.log(process.env.DiscordBot);
    client.login(process.env.DiscordBot);
    console.log("logged in!");
  } catch (err) {
    console.log("error Occured initilizing the database: ", err);
  }
};

const getClient = () => {
  return client;
};

module.exports.initClient = initClient;
module.exports.getClient = getClient;
