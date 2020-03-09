const mutation = require('app/mutation');
const mutationMapper = require('interfaces/http/mappers/mutation-mapper');
const lambdaErrorHandler = require('interfaces/http/middlewares/lambda-error-handler');
const mutationRepository = require('infra/repositories/mutation-repository');

const hasMutationHandler = lambdaErrorHandler(async (event) => {
  const dna = mutationMapper.hasMutationMapper(event);

  // TODO: Validate `dna` here instead.

  const id = 'test-123';
  let model = await mutationRepository.findById(id);

  if (!mutation) {
    const mutated = mutation.hasMutation(dna);

    model = await mutationRepository.create(id, mutated);
  }

  return {
    statusCode: model.mutated ? 200 : 403,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hasMutation: mutation.mutated,
    }),
  };
});

module.exports = {
  hasMutationHandler,
};
