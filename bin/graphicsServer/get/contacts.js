const axios = require('../utils/axios');
const { GRAPHICS_API } = require('../constants/locations');
const logger = require('../../../config/utils/logger')('Graphics Server');
const os = require('os');
const fs = require('fs');
const path = require('path');

const getEmail = () => {
  const credFilePath = path.join(os.homedir(), '.reuters-graphics/profile.json');
  const credFile = fs.readFileSync(credFilePath);
  const { email } = JSON.parse(credFile);
  return email;
};

const defaultEditors = [{
  id: 'c0776999-5c3e-421d-b013-39c884953cbb',
  name: 'Matthew Weber',
}, {
  id: 'bb1b077f-8be3-df11-a5dd-18a9055605fe',
  name: 'Simon Scarr',
}, {
  id: '865386f4-acd1-49ce-b478-025bd564752b',
  name: 'Jonathan McClure',
}, {
  id: '671b077f-8be3-df11-a5dd-18a9055605fe',
  name: 'Christine Chan',
}];

const getEditor = (editors) => {
  const userEmail = getEmail();
  const userEditors = editors.filter(editor => editor.email.toLowerCase() === userEmail.toLowerCase());
  if (userEditors.length === 0) return defaultEditors;
  const { id, firstName, lastName } = userEditors[0];
  return [{
    id,
    name: `${firstName} ${lastName}`,
  }];
};

const getContacts = async(token) => {
  logger.info('Getting contacts');
  const headers = { Authorization: `Bearer ${token}` };
  const params = { skip: 0, take: 200 };
  const { data } = await axios.get(`${GRAPHICS_API}/groups/v1/groups/rngs/roles/editors`, { headers, params });
  return getEditor(data.items);
};

module.exports = getContacts;
