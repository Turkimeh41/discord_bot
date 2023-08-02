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

const verifactionWidgetSetup = () => {
  const verifactionEmbed = new EmbedBuilder()
    .setTitle(`السلام عليكم ورحمه الله وبركاته`)
    .setDescription(`حياك الله بالسيرفر توه ما نور, اضغط على علامة الاخضر للتحقق`)
    .setColor("Green");

  const row = new ActionRowBuilder();
  row.components.push(new ButtonBuilder().setCustomId("1134481911415320646").setLabel("التحقق").setStyle(ButtonStyle.Success));
  return { button: [row], embed: [verifactionEmbed] };
};

const ticketWidgetSetup = async () => {
  const embed = new EmbedBuilder()
    .setColor("#ffbf00")
    .setTitle("الشـراء")
    .setDescription(
      "حياك الله عزيزي,\n\n ريح بالك واشتر من خدماتنا المتوفرة من التقينات الحديثة بارخص سعر متوفر لك ومتى ما تبغى\n\n الذكاء الاصطناعي من **ChatGPT 4.0**\n اخر واسرع نسخة, ممكن تتحمل تقريبا الى 6000 كلمة ورد بشكل سريع\n السعر **1$** \n\n الذكاء الاصطناعي من **MidJourney**\n يسمح لك تتخيل جملة ويصنع لك صورة عبر تقنيات الذكاء الاصطناعي بسرعة خيالية! \n السعر **1$** \n\n او اشتر الاثنين مع بعض واستمتع باستخدام التقنيتين متى ما تبغى\n السعر دولارين \n"
    )
    .setFooter({ text: "**ملاحظة: مدة الاشتراك فقط يوم واحد, عند الانتهاء ممكن التجديد مره اخرى**" });

  const row = new ActionRowBuilder();
  row.components.push(new ButtonBuilder().setCustomId("1").setLabel("GPT-4").setStyle(ButtonStyle.Success));
  row.components.push(new ButtonBuilder().setCustomId("2").setLabel("MidJourney").setStyle(ButtonStyle.Danger));
  row.components.push(new ButtonBuilder().setCustomId("3").setLabel("Both").setStyle(ButtonStyle.Primary));

  return { embeds: embed, components: row };
};

function chatGPTBuyPrompt(position) {
  if (position == 0) {
    const embed = new EmbedBuilder()
      .setTitle("GPT 4.0")
      .setColor("Green")
      .setDescription("هل من الاكيد تريد شراء اشتراك GPT 4 لمدة يوم واحد؟\n\nللأستمرار اضغط الاخضر او الاحمر لأغلاق التذكرة");

    const row = new ActionRowBuilder();

    row.components.push(new ButtonBuilder().setCustomId("1.1").setLabel("الاستــمرار").setStyle(ButtonStyle.Success));

    row.components.push(new ButtonBuilder().setCustomId("close").setLabel("الأغـــلاق").setStyle(ButtonStyle.Danger));

    return { embed: embed, row: row };
  } else if (position == 1) {
  }
}

function midJourneyBuyPrompt(position) {
  if (position == 0) {
    const embed = new EmbedBuilder()
      .setTitle("Midjourney")
      .setColor("Green")
      .setDescription(
        "هل من الاكيد تريد شراء اشتراك midJourney المخصص للصور الذكية لمدة يوم واحد؟\n\nللأستمرار اضغط الاخضر او الاحمر لأغلاق التذكرة"
      );

    const row = new ActionRowBuilder();

    row.components.push(new ButtonBuilder().setCustomId("2.1").setLabel("الاستــمرار").setStyle(ButtonStyle.Success));

    row.components.push(new ButtonBuilder().setCustomId("close").setLabel("الأغـــلاق").setStyle(ButtonStyle.Danger));

    return { embed: embed, row: row };
  }
}

module.exports.midJourneyBuyPrompt = midJourneyBuyPrompt;
module.exports.chatGPTBuyPrompt = chatGPTBuyPrompt;
module.exports.verifactionWidgetSetup = verifactionWidgetSetup;
module.exports.ticketWidgetSetup = ticketWidgetSetup;
