'use strict';

const { getAllByUser } = require('../../lib/shortcuts');
const { sendDM } = require('../../lib/discordjs-utils');

const info = {
  name: 'List',
  command: 'list',
  args: null,
  description: 'List all the shortcuts available for the user'
};

const action = async (message) => {
  const author = message.author;
  try {
    const shortcuts = getAllByUser(author.id);
    if (shortcuts.length > 0) {
      await message.channel.send('[' + author.username + ']');
      for (const s of shortcuts) {
        await message.channel.send(`${s.name} : `);
        for (const e of s.gifs) {
          await message.channel.send(e);
        }
      };
    } else {
      sendDM(`Your shortcuts list is now empty.\nUse _${process.env.PREFIX} create_ to create a shortcut !`, message);
    }
  } catch (e) {
    sendDM(
      `An error occured, maybe you never created a shortcut.\nUse _${process.env.PREFIX} create_ to create a shortcut !`,
      message
    );
  }
};

module.exports = {
  info,
  action
};
