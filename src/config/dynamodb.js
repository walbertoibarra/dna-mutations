const { env } = process;

const config = {
  region: env.REGION,
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET,
};

if (env.NODE_ENV === 'development') {
  config.endpoint = env.DYNAMODB_ENDPOINT;
}

module.exports = config;
