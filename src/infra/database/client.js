const DynamoDB = require('aws-sdk/clients/dynamodb');

const config = require('config/dynamodb');

const client = new DynamoDB.DocumentClient(config);

module.exports = {
  client,
};
