const { hasMutation } = require('app/mutation/has-mutation');

describe('app.mutation.hasMutation', () => {
  describe('Check with bad data', () => {
    it('When given null/undefined', () => {
      expect(() => {
        hasMutation(null);
      }).toThrow('Invalid DNA');

      expect(() => {
        hasMutation();
      }).toThrow('Invalid DNA');
    });

    it('When given an empty array', () => {
      expect(() => {
        hasMutation([]);
      }).toThrow('Invalid DNA length');
    });

    it('When given array with less than 4 elements', () => {
      expect(() => {
        hasMutation(['ATGCGA', 'CAGTGC', 'TTATGT']);
      }).toThrow('Invalid DNA length');
    });

    it('When not all elements are strings', () => {
      expect(() => {
        hasMutation(['ATGCGA', 'CAGTGC', 'TTATGT', 123]);
      }).toThrow('Invalid DNA elements');
    });

    it('When not all elements are the same length', () => {
      expect(() => {
        hasMutation(['ATGC', 'CAGT', 'TTAT', 'AG']);
      }).toThrow('Invalid DNA elements length');
    });

    it('When an element has an invalid nitrogen base (A,T,C,G)', () => {
      expect(() => {
        hasMutation(['ATGC', 'CAGT', 'TTAT', 'XXXX']);
      }).toThrow('Invalid DNA elements nitrogen base');
    });
  });
});
