jest.mock('aws-sdk/clients/dynamodb');

const DynamoDB = require('aws-sdk/clients/dynamodb');

const { client } = require('infra/database/client');

describe('infra.database.client', () => {
  it('Returns an instance of `DynamoDB.DocumentClient`', () => {
    expect(client).toBeInstanceOf(DynamoDB.DocumentClient);
  });
});
