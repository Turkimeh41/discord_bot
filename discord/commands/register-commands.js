require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.DiscordBot);
const commands = [
  {
    name: "imagine",
    description: "imagines a picture, using Dalle-2 OpenAI model AI",
    options: [
      {
        name: "prompt",
        description: "What you are imagining",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

/* const commands = [
  {
    name: "add",
    description: "Adds two Numbers",
    options: [
      {
        name: "first-number",
        description: "The first number",
        type: ApplicationCommandOptionType.Number,
        choices: [
          { name: "one", value: 1 },
          { name: "two", value: 2 },
          { name: "three", value: 3 },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "The second number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
]; */

/* const commands = [
  {
    name: "ask",
    description: "أسال تشات جي بي تي-4 عن اي سؤال",
    options: [
      {
        name: "السؤال",
        description: "السؤال الموجه الى تشات جي بي تي-4",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
]; */

const registerCommandsFunction = async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );
    console.log("slash Commands, were Registered");
  } catch (err) {
    console.log(`Error has been occured ${err}`);
  }
};

registerCommandsFunction();
