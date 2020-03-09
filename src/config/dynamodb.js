const { env } = process;

module.exports = {
  region: env.REGION,
  endpoint: env.DYNAMODB_ENDPOINT,
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET,
};
