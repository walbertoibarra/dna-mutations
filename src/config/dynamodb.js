const { isDevelopment } = require('domain/lib/env');

const { env } = process;

const config = {
  region: env.REGION,
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET,
  tablePrefix: env.DYNAMODB_TABLE_PREFIX || '',
};

if (isDevelopment()) {
  config.endpoint = env.DYNAMODB_ENDPOINT;
}

module.exports = config;
