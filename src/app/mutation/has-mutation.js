const validateDna = (dna) => {
  if (!Array.isArray(dna)) {
    throw new Error('Invalid DNA');
  }

  if (dna.length < 4) {
    throw new Error('Invalid DNA length');
  }

  for (let sequence of dna) {
    if (typeof sequence !== 'string') {
      throw new Error('Invalid DNA elements');
    }

    if (sequence.length !== dna.length) {
      throw new Error('Invalid DNA elements length');
    }

    // Only the 4 nitrogen bases are allowed.
    const nitrogenBases = ['A', 'T', 'C', 'G'];

    for (let nitrogenBase of sequence.toUpperCase().split('')) {
      if (!nitrogenBases.includes(nitrogenBase)) {
        throw new Error('Invalid DNA elements nitrogen base');
      }
    }
  }
};

const hasMutation = (dna) => {
  validateDna(dna);
};

module.exports = {
  hasMutation,
};
