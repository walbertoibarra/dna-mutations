jest.mock('config/dynamodb', () => ({ tablePrefix: 'test_' }));

const DynamoDbTable = require('domain/enum/dynamodb-table');

describe('domain.enum.DynamoDbTable', () => {
  it('asdf', () => {
    expect(DynamoDbTable).toEqual({
      Mutation: 'test_mutation',
    });
  });
});
