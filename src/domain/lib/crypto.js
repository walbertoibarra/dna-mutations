const crypto = require('crypto');

const hashString = (str) => crypto.createHash('md5').update(str).digest('hex');

module.exports = {
  hashString,
};
