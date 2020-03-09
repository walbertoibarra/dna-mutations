const hasMutationMapper = (event) => JSON.parse(event.body).dna;

module.exports = {
  hasMutationMapper,
};
