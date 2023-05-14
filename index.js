const loadUtils = require("./utils/index.js");
loadUtils();
const validateFunc= require("./utils/validateFunc.js");
const fs = require("fs");
const path = require("path");
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.on("messageCreate", (message) => {
  if (message.author.bot) return false;

  if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;
  if(!message.content.startsWith("$")) return;
  let data = validateFunc(message.content)[0];
  console.log(data);
  var exampleEmbed = {
            color: 0x0099ff,
            title: 'Function Usage of ' + data.name,

            description: `${data.desc}`,

            fields: [
              {
                name: '**Usage:**',
                value: `\`\`\`${data.usage}\`\`\``,
                inline: false,
              }, {
                name: '**Example:**',
                value: `${data.example}`,
                inline: false,
              }
            ],
            timestamp: new Date().toISOString(),
          };
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setURL(data.docs)
        .setLabel('Docs!')
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setURL(data.src)
        .setLabel('Source Code!')
        .setStyle(ButtonStyle.Link)
    );
  message.channel.send({embeds:[exampleEmbed], components: [row]})

});


client.login(process.env.token);

