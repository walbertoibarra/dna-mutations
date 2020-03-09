const { validateDna } = require('domain/lib/validators');

describe('domain.lib.validators', () => {
  describe('validateDna', () => {
    it('When given null/undefined', () => {
      expect(() => {
        validateDna(null);
      }).toThrow('Invalid DNA');

      expect(() => {
        validateDna();
      }).toThrow('Invalid DNA');
    });

    it('When given an empty array', () => {
      expect(() => {
        validateDna([]);
      }).toThrow('Invalid DNA length');
    });

    it('When given array with less than 4 elements', () => {
      expect(() => {
        validateDna(['ATGCGA', 'CAGTGC', 'TTATGT']);
      }).toThrow('Invalid DNA length');
    });

    it('When not all elements are strings', () => {
      expect(() => {
        validateDna(['ATGC', 'CAGT', 'TTAT', 123]);
      }).toThrow('Invalid DNA elements');
    });

    it('When not all elements are the same length', () => {
      expect(() => {
        validateDna(['ATGC', 'CAGT', 'TTAT', 'AG']);
      }).toThrow('Invalid DNA elements length');
    });

    it('When an element has an invalid nitrogen base (A,T,C,G)', () => {
      expect(() => {
        validateDna(['ATGC', 'CAGT', 'TTAT', 'XXXX']);
      }).toThrow('Invalid DNA elements nitrogen base');
    });
  });
});
