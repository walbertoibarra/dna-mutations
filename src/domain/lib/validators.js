const { dnaMinLength } = require('config/dna');
const { BadRequest } = require('domain/lib/http-errors');

const validateDna = (dna) => {
  if (!Array.isArray(dna)) {
    throw new BadRequest('Invalid DNA');
  }

  const len = dna.length;

  if (len < dnaMinLength) {
    throw new BadRequest('Invalid DNA length');
  }

  for (let k = 0; k < len; k += 1) {
    const sequence = dna[k];

    if (typeof sequence !== 'string') {
      throw new BadRequest('Invalid DNA elements');
    }

    if (sequence.length !== len) {
      throw new BadRequest('Invalid DNA elements length');
    }

    // Only the 4 nitrogen bases are allowed.
    const nitrogenBases = ['A', 'T', 'C', 'G'];
    const sequenceBases = sequence.toUpperCase().split('');

    for (let i = 0; i < len; i += 1) {
      const nitrogenBase = sequenceBases[i];

      if (!nitrogenBases.includes(nitrogenBase)) {
        throw new BadRequest('Invalid DNA elements nitrogen base');
      }
    }
  }
};

module.exports = {
  validateDna,
};
