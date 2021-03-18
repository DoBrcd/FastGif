'use strict';

const { tryDelete, sendDM } = require('../../lib/discordjs-utils');
const { addShortcut } = require('../../lib/shortcuts');

const info = {
  name: 'Create',
  command: 'create',
  args: 'name * , gif URL *',
  description: 'Create a custom gif shortcut'
};

const action = async (message, args) => {
  const name = args.shift();
  const author = message.author;

  // No shortcut name
  if (!name) {
    sendDM('Error: No name provided', message);
    return;
  }

  // Delete command message if possible
  tryDelete(message);

  if (args.length > 0) {
    const url = args;
    try {
      await addGifUrl(message, name, author, url);
    } catch (e) {
      await sendDM(`Error while creating your shortcut ! (${e})`, message);
    }
  } else {
    const formMessage = await sendDM(
      'Send the gif you would like to add to your shortcut',
      message
    );

    // Gif recuperation (60s to do so)
    try {
      const collected = await formMessage.channel.awaitMessages((m) => !m.author.bot, {
        time: 60000
      });
      const gif = collected
        .array()
        .map((msg) => msg.content);
      await addGifUrl(message, name, author, gif);
    } catch (e) {
      await sendDM(`Error while creating your shortcut ! (${e})`, message);
    }
  }
};

// Verify non empty arr and add shortcut
async function addGifUrl (message, name, author, GifURL) {
  // Filter valid emojis
  const addedGif = GifURL.map(s => s.startsWith('http'));
  if (GifURL.length <= 0) {
    sendDM('Error: No emojis provided', message);
    return;
  }
  addShortcut(author.id, name, addedGif);
  await sendDM(
    `Shortcut created :\n${name} : ${addedGif.join(' ')}`,
    message
  );
}

module.exports = {
  info,
  action
};
