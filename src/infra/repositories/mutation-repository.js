const { client } = require('infra/database/client');
const DynamoDbTable = require('domain/enum/dynamodb-table');

const create = async (id, mutated) => {
  const now = new Date().getTime();
  const params = {
    TableName: DynamoDbTable.Mutation,
    Item: {
      id,
      mutated: mutated.toString(),
      createdAt: now,
      updatedAt: now,
    },
  };

  await client.put(params).promise();

  return params.Item;
};

const findById = async (id) => {
  const params = {
    TableName: DynamoDbTable.Mutation,
    Key: {
      id,
    },
  };
  const result = await client.get(params).promise();

  return result.Item;
};

const countMutationsByMutated = async (mutated) => {
  const params = {
    TableName: DynamoDbTable.Mutation,
    IndexName: 'mutatedCountIndex',
    KeyConditionExpression: '#mutated = :mutatedValue',
    ExpressionAttributeNames: {
      '#mutated': 'mutated',
    },
    ExpressionAttributeValues: {
      ':mutatedValue': mutated.toString(),
    },
    Select: 'COUNT',
  };

  return client.query(params).promise();
};

const getStats = async () => {
  const [mutationsCount, noMutationsCount] = await Promise.all([
    countMutationsByMutated(true),
    countMutationsByMutated(false),
  ]);

  return {
    mutationsCount: mutationsCount.Count,
    noMutationsCount: noMutationsCount.Count,
  };
};

module.exports = {
  create,
  findById,
  getStats,
};
