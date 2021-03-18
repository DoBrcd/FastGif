'use strict';

const Discord = require('discord.js');
const shortcuts = require('../../lib/shortcuts');
const { tryDelete, sendDM } = require('../../lib/discordjs-utils');

const info = {
  name: 'React',
  command: 'react',
  args: 'type *',
  description: 'Add reactions to channel last message based on a selected type'
};

const action = async (message, args) => {
  if (args.length <= 0) {
    sendDM('No shortcut selected', message);
  }
  const messages = await message.channel.messages.fetch({ limit: 2 });
  const lastMessage = messages.last();
  tryDelete(message);
  for (const type of args) {
    const reaction = shortcuts.getShortcut(message.author.id, type);
    if (reaction) {
      const author = message.member ?? message.author;
      // await lastMessage.channel.send(`${message.author} : `);
      for (const e of reaction.gifs) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor(author.displayHexColor)
          .setTitle(type)
          .setAuthor(author.displayName, message.author.avatarURL());
        exampleEmbed.setImage(e);
        await lastMessage.channel.send(exampleEmbed);
      }
    } else {
      sendDM(`No shurtcut corresponding to '${type}'`, message);
    }
  }
};

module.exports = {
  info,
  action
};
