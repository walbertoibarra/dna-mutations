const { client } = require('infra/database/client');

const create = async (id, mutated) => {
  const now = new Date().getTime();
  const params = {
    TableName: 'mutation',
    Item: {
      id,
      mutated,
      createdAt: now,
      updatedAt: now,
    },
  };

  await client.put(params).promise();

  return params.Item;
};

const findById = async (id) => {
  const params = {
    TableName: 'mutation',
    Key: {
      id,
    },
  };
  const result = await client.get(params).promise();

  return result.Item;
};

module.exports = {
  create,
  findById,
};
