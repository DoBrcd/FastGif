'use strict';

const react = require('./use/use');
const create = require('./create/create');
const list = require('./list/list');
const del = require('./delete/delete');
const update = require('./update/update');

// Commands
const commands = [react, create, update, del, list];
const defaultCommand = react;

// Register commands if they are compliant
module.exports = {
  commands: commands.filter((c) => verifyCommand(c)),
  defaultCommand: verifyCommand(defaultCommand) ? defaultCommand : null
};

// Verify the command is compliant to the app
function verifyCommand (c) {
  const cinfoco = c.info ? c.info.command : null;
  const caction = c.action;
  return cinfoco && caction;
}
