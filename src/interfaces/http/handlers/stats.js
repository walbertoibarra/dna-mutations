const lambdaErrorHandler = require('interfaces/http/middlewares/lambda-error-handler');
const mutationRepository = require('infra/repositories/mutation-repository');

const statsHandler = lambdaErrorHandler(async () => {
  const { mutationsCount, noMutationsCount } = await mutationRepository.getStats();
  const ratio = noMutationsCount > 0 ? mutationsCount / noMutationsCount : mutationsCount;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      count_mutations: mutationsCount,
      count_no_mutation: noMutationsCount,
      ratio,
    }),
  };
});

module.exports = {
  statsHandler,
};
