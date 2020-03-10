const Environment = require('domain/enum/environment');

const { env: { NODE_ENV: nodeEnv } } = process;

const isDevelopment = () => nodeEnv === Environment.Development;

const isStaging = () => nodeEnv === Environment.Staging;

const isProduction = () => nodeEnv === Environment.Production;

module.exports = {
  isDevelopment,
  isStaging,
  isProduction,
};
