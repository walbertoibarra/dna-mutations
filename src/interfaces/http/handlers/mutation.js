const mutation = require('app/mutation');
const mutationMapper = require('interfaces/http/mappers/mutation-mapper');
const lambdaErrorHandler = require('interfaces/http/middlewares/lambda-error-handler');

const hasMutationHandler = lambdaErrorHandler(async (event) => {
  const dna = mutationMapper.hasMutationMapper(event);
  const mutated = mutation.hasMutation(dna);

  return {
    statusCode: mutated ? 200 : 403,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hasMutation: mutated,
    }),
  };
});

module.exports = {
  hasMutationHandler,
};
