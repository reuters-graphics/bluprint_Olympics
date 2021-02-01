const os = require('os');
const fs = require('fs');
const path = require('path');

module.exports = () => {
  const credFilePath = path.join(os.homedir(), '.reuters-graphics/graphics-server.json');
  if (!fs.existsSync(credFilePath)) throw new Error('Can\'t find graphics server credentials file');
  const credFile = fs.readFileSync(credFilePath);
  return JSON.parse(credFile);
};
