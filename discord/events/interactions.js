require("dotenv").config();
const db = require("../../database/database.js");
const { createImage } = require("../../openAI/openai.js");
const { ticketWidgetSetup } = require("../../discord/utils/buttons.js");

const interactionEvent = (interaction) => {
  console.log("interaction has been created, proceeding with a reply...");
  if (interaction.isChatInputCommand()) commandsInteractionHandler(interaction);
  else if (interaction.isButton()) buttonInteractionHandler(interaction);
  else {
    return;
  }
};

async function commandsInteractionHandler(interaction) {
  if (interaction.commandName === "ask") {
    interaction.reply("وعليكم السلام اهلا!");
  } else if (interaction.commandName === "imagine") {
    const prompt = interaction.options.get("prompt");
    await interaction.deferReply({ ephemeral: true });
    const response = await createImage(prompt);
    interaction.editReply(response.data.data[0].url);
  }
}

async function buttonInteractionHandler(interaction) {
  //زر التحقق لاخضرا
  if (interaction.customId === process.env.MEMBER_ROLE_ID) {
    await interaction.deferReply({ ephemeral: true });
    const memberRole = interaction.guild.roles.cache.get(interaction.customId);
    const guestRole = interaction.guild.roles.cache.get(process.env.GUEST_ROLE_ID);
    await interaction.member.roles.add(memberRole);
    await interaction.editReply(`تم التحقق, شكرا لك!`);

    await db.addMember(interaction.member.user.id, interaction.member.user.username, interaction.member.user.avatarURL());
    await interaction.member.roles.remove(guestRole);

    //Buying Chat GPT
  } else if (interaction.customId === "1") {
    console.log(interaction.member);
    const data = await ticketWidgetSetup();
    const embed = data["embeds"];
    const row = data["components"];
    interaction.member.user.send("Wasap nigga");

    console.log("شراء ل CHATGPT");
  }
  //Buying midjourney
  else if (interaction.customId === "2") {
    console.log("شراء ل MidJourney");
    interaction.reply("Midjourney");
  }
  //buying Both
  else {
    interaction.reply("Both");
    console.log("شراء ل Both");
  }
}

module.exports.interactionEvent = interactionEvent;
