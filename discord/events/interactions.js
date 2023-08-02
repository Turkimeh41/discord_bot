require("dotenv").config();
const db = require("../../database/database.js");
const { createImage } = require("../../openAI/openai.js");
const { ticketWidgetSetup, chatGPTBuyPrompt, midJourneyBuyPrompt } = require("../../discord/utils/buttons.js");
const { ChannelType, PermissionsBitField } = require("discord.js");

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
    const postChannel = interaction.guild.channels.cache.find((c) => c.name === `ticket-${interaction.user.id}`);
    //ticket already there
    if (postChannel != null) {
      return await interaction.reply({ content: "لديك تذكرة مفتوحة, ارجوا اغلاقهل لفتح تذكرة جديدة 😁", ephemeral: true });
    }
    let channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.id}`,
      type: ChannelType.GuildText,
      parent: `${"1134487589110415420"}`,
      permissionOverwrites: [
        { id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionsBitField.Flags.ViewChannel] },
      ],
    });

    const data = chatGPTBuyPrompt(0);

    channel.send({ embeds: [data.embed], components: [data.row] });
    await interaction.reply({ content: `تم فتح التذكرة رقم  ${channel}`, ephemeral: true });

    console.log("شراء ل CHATGPT");
  }
  //Buying midjourney
  else if (interaction.customId === "2") {
    const postChannel = interaction.guild.channels.cache.find((c) => c.name === `ticket-${interaction.user.id}`);
    //ticket already there
    if (postChannel != null) {
      return await interaction.reply({ content: "لديك تذكرة مفتوحة, ارجوا اغلاقهل لفتح تذكرة جديدة 😁", ephemeral: true });
    }
    let channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.id}`,
      type: ChannelType.GuildText,
      parent: `${"1134487589110415420"}`,
    });

    const data = midJourneyBuyPrompt(0);

    channel.send({ embeds: [data.embed], components: [data.row] });
    await interaction.reply({ content: `تم فتح التذكرة رقم  ${channel}`, ephemeral: true });

    if (interaction.customId === "2.1") {
    } else if (interaction.customId === "2.2") {
    } else if (interaction.customId === "2.3") {
    }
  }

  //buying Both
  else if (interaction.customId === "3") {
    interaction.reply("Both");
    console.log("شراء ل Both");
  } else if (interaction.customId === "close") {
    const channel = interaction.guild.channels.cache.find((c) => c.name === `ticket-${interaction.user.id}`);
    await channel.delete();
  }
}

module.exports.interactionEvent = interactionEvent;
