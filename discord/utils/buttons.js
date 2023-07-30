const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const verifactionWidget = () => {
  const verifactionEmbed = new EmbedBuilder()
    .setTitle(`السلام عليكم ورحمه الله وبركاته`)
    .setDescription(
      `حياك الله بالسيرفر توه ما نور, اضغط على علامة الاخضر للتحقق`
    )
    .setColor("Green");

  const row = new ActionRowBuilder();
  row.components.push(
    new ButtonBuilder()
      .setCustomId("1134481911415320646")
      .setLabel("التحقق")
      .setStyle(ButtonStyle.Success)
  );
  return { button: row, embed: verifactionEmbed };
};
module.exports.verifactionWidget = verifactionWidget;
