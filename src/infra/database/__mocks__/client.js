const dynamodbWrapper = () => jest.fn(() => ({
  promise: () => Promise.resolve({ }),
}));

const client = {
  get: dynamodbWrapper(),
  put: dynamodbWrapper(),
  query: dynamodbWrapper(),
};

module.exports = {
  client,
};
