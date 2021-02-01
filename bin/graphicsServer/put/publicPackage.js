const path = require('path');
const axios = require('../utils/axios');
const zipDir = require('../utils/zipDir');
const getFileUploadStatus = require('../get/fileUploadStatus');
const logger = require('../../../config/utils/logger')('Graphics Server');

const putFile = async(uri, locale, token) => {
  logger.info('Updating public package');
  const headers = {
    'Content-Type': 'application/zip',
  };

  const localePkgPath = path.join(__dirname, `../../../packages/${locale}/public-${locale}/`);

  const zip = await zipDir(localePkgPath, `public-${locale}`);

  try {
    const response = await axios.put(uri, zip, {
      headers,
      maxBodyLength: zip.byteLength * 2,
      maxContentLength: zip.byteLength,
    });
    return response;
  } catch (e) {
    e.response.data.errors.forEach((error) => {
      logger.error(error.error_description);
    });
  }
};

module.exports = async(uri, id, locale, token) => {
  await putFile(uri, locale, token);
  const { id: uploadedFileId } = await getFileUploadStatus(id, token);
  return uploadedFileId;
};
