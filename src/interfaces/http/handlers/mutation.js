const mutation = require('app/mutation');
const mutationMapper = require('interfaces/http/mappers/mutation-mapper');
const lambdaErrorHandler = require('interfaces/http/middlewares/lambda-error-handler');
const mutationRepository = require('infra/repositories/mutation-repository');
const { validateDna } = require('domain/lib/validators');
const { hashString } = require('domain/lib/crypto');

const hasMutationHandler = lambdaErrorHandler(async (event) => {
  const dna = mutationMapper.hasMutationMapper(event);

  validateDna(dna);

  const id = hashString(JSON.stringify(dna));
  let model = await mutationRepository.findById(id);

  // Check if we already evaluated this DNA.
  if (!model) {
    console.log(`Verifying new DNA sequence with id: ${id}`);

    const mutated = mutation.hasMutation(dna);

    model = await mutationRepository.create(id, mutated);
  }

  return {
    statusCode: model.mutated ? 200 : 403,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      hasMutation: model.mutated,
    }),
  };
});

module.exports = {
  hasMutationHandler,
};
