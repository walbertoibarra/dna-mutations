const dnaMinLength = 4;

const validateDna = (dna) => {
  if (!Array.isArray(dna)) {
    throw new Error('Invalid DNA');
  }

  const len = dna.length;

  if (len < dnaMinLength) {
    throw new Error('Invalid DNA length');
  }

  for (let k = 0; k < len; k += 1) {
    const sequence = dna[k];

    if (typeof sequence !== 'string') {
      throw new Error('Invalid DNA elements');
    }

    if (sequence.length !== len) {
      throw new Error('Invalid DNA elements length');
    }

    // Only the 4 nitrogen bases are allowed.
    const nitrogenBases = ['A', 'T', 'C', 'G'];
    const sequenceBases = sequence.toUpperCase().split('');

    for (let i = 0; i < len; i += 1) {
      const nitrogenBase = sequenceBases[i];

      if (!nitrogenBases.includes(nitrogenBase)) {
        throw new Error('Invalid DNA elements nitrogen base');
      }
    }
  }
};

const checkForHorizontalMutation = (dna, i, j) => (
  dna[i][j] === dna[i][j + 1]
  && dna[i][j] === dna[i][j + 2]
  && dna[i][j] === dna[i][j + 3]
);

const checkForVerticalMutation = (dna, i, j) => (
  dna[i][j] === dna[i + 1][j]
  && dna[i][j] === dna[i + 2][j]
  && dna[i][j] === dna[i + 3][j]
);

const checkForHorizontalVerticalMutation = (dna, i) => {
  const size = dna.length - 3;

  for (let j = 0; j < size; j += 1) {
    // Horizontal mutations.
    if (checkForHorizontalMutation(dna, i, j)) {
      return true;
    }

    // Vertical mutations.
    if (checkForVerticalMutation(dna, j, i)) {
      return true;
    }
  }

  return false;
};

const checkForLDiagonalMutation = (dna, i, j) => (
  dna[i][j] === dna[i - 1][j + 1]
  && dna[i][j] === dna[i - 2][j + 2]
  && dna[i][j] === dna[i - 3][j + 3]
);

const checkForRDiagonalMutation = (dna, i, j) => (
  dna[i][j] === dna[i - 1][j - 1]
  && dna[i][j] === dna[i - 2][j - 2]
  && dna[i][j] === dna[i - 3][j - 3]
);

const isValidLPosition = (len, i, j) => i >= (dnaMinLength - 1) && j >= 0
  && i < len && j < len - (dnaMinLength - 1);

const isValidRPosition = (len, i, j) => i >= (dnaMinLength - 1) && j >= (dnaMinLength - 1)
  && i < len && j < len;

const checkForDiagonalMutation = (dna, k) => {
  const len = dna.length;
  const tmp = {
    l1: {
      i: k,
      j: 0,
    },
    l2: {
      i: len - 1,
      j: k + 1,
    },
    r1: {
      i: k,
      j: len - 1,
    },
    r2: {
      i: len - 1,
      j: len - k - 1,
    },
  };

  // Diagonally upward, top half (left to right).
  while (isValidLPosition(len, tmp.l1.i, tmp.l1.j)) {
    if (checkForLDiagonalMutation(dna, tmp.l1.i, tmp.l1.j)) {
      return true;
    }

    tmp.l1.i -= 1;
    tmp.l1.j += 1;
  }

  // Diagonally upward, bottom half (left to right).
  while (isValidLPosition(len, tmp.l2.i, tmp.l2.j)) {
    if (checkForLDiagonalMutation(dna, tmp.l2.i, tmp.l2.j)) {
      return true;
    }

    tmp.l2.i -= 1;
    tmp.l2.j += 1;
  }

  // Diagonally upward, top half (right to left).
  while (isValidRPosition(len, tmp.r1.i, tmp.r1.j)) {
    if (checkForRDiagonalMutation(dna, tmp.r1.i, tmp.r1.j)) {
      return true;
    }

    tmp.r1.i -= 1;
    tmp.r1.j -= 1;
  }

  // Diagonally upward, bottom half (right to left).
  while (isValidRPosition(len, tmp.r2.i, tmp.r2.j)) {
    if (checkForRDiagonalMutation(dna, tmp.r2.i, tmp.r2.j)) {
      return true;
    }

    tmp.r2.i -= 1;
    tmp.r2.j -= 1;
  }

  return false;
};

const hasMutation = (dna) => {
  validateDna(dna);

  const len = dna.length;

  for (let k = 0; k < len; k += 1) {
    if (checkForHorizontalVerticalMutation(dna, k)) {
      return true;
    }

    if (checkForDiagonalMutation(dna, k)) {
      return true;
    }
  }

  return false;
};

module.exports = {
  hasMutation,
};
