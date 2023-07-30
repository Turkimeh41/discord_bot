const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SelectMenuBuilder,
  PermissionsBitField,
  ChannelType,
  SlashCommandBuilder,
  Embed,
} = require("discord.js");
const Ticket = require("../../database/Ticket");

const verifactionWidget = () => {
  const verifactionEmbed = new EmbedBuilder()
    .setTitle(`السلام عليكم ورحمه الله وبركاته`)
    .setDescription(`حياك الله بالسيرفر توه ما نور, اضغط على علامة الاخضر للتحقق`)
    .setColor("Green");

  const row = new ActionRowBuilder();
  row.components.push(new ButtonBuilder().setCustomId("1134481911415320646").setLabel("التحقق").setStyle(ButtonStyle.Success));
  return { button: [row], embed: [verifactionEmbed] };
};

const ticketSetup = async () => {
  new SlashCommandBuilder()
    .setName("تجهيز-نظام-التذكرة")
    .setDescription("يجهز نظام التذكرة")
    .addChannelOption((option) =>
      option.setName("القناة").setDescription("القناة الي بتحط فيهاالنظام").addChannelTypes(ChannelType.GuildText)
    )
    .addChannelOption((option) =>
      option.setName("المجموعة").setDescription("المجموعة الي التذاكر راح تنرسل اليها").addChannelTypes(ChannelType.GuildText)
    );

  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return await interaction.reply({
      content: "مرفوض, لازم تكون ادمن لتنفيذ الصلاحية",
      ephemeral: true,
    });
  }
  const channel = interaction.options.getChannel("channel");
  const category = interaction.options.getChannel("category");

  const embed = new EmbedBuilder()
    .setColor("Yellow")
    .setTitle("نظام التذكرة")
    .setDescription(
      "ودك تشتري من الخدمات المتوفرة؟, حياك هنا\n عشان تبدأ اختار اي نوع ودك فيه\n CHATGPT 1$ \n MidJourney 1$ \n كلهم مع بعض 2 $"
    );

  const row = new ActionRowBuilder();
  row.components.push(new ButtonBuilder().setCustomId("1").setLabel("CHATGPT").setStyle(ButtonStyle.Success));
  row.components.push(new ButtonBuilder().setCustomId("2").setLabel("MidJourney").setStyle(ButtonStyle.Danger));
  row.components.push(new ButtonBuilder().setCustomId("3").setLabel("Both").setStyle(ButtonStyle.Primary));

  await channel.send({ embeds: [embed], components: [row] });
};

module.exports.verifactionWidget = verifactionWidget;

module.exports.ticketSetup = ticketSetup;
