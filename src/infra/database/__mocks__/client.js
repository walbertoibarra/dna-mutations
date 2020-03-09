const dynamodbWrapper = () => jest.fn((params) => ({
  promise: () => Promise.resolve(),
}));

const client = {
  get: dynamodbWrapper(),
  put: dynamodbWrapper(),
};

module.exports = {
  client,
};
