const { tablePrefix } = require('config/dynamodb');

const DynamoDbTable = {
  Mutation: 'mutation',
};

// Since DynamoDB does not allow the same table names for different environments, prefix tables.
if (tablePrefix) {
  console.log(`Prefixing tables with: ${tablePrefix}`);

  Object
    .entries(DynamoDbTable)
    .forEach(([key, value]) => {
      DynamoDbTable[key] = tablePrefix + value;
    });
}

module.exports = Object.freeze(DynamoDbTable);
