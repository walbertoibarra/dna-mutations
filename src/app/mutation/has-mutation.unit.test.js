const { hasMutation } = require('app/mutation/has-mutation');

describe('app.mutation.hasMutation', () => {
  it('Does not have mutation', () => {
    expect(hasMutation(['ATCG', 'GCTA', 'ATCG', 'GCTA'])).toBe(false);
  });

  it('Has horizontal mutation', () => {
    expect(hasMutation(['ATCG', 'GCTA', 'ATCG', 'GGGG'])).toBe(true);
    expect(hasMutation(['ATCG', 'GCTA', 'CCCC', 'GCTA'])).toBe(true);
    expect(hasMutation(['ATCG', 'TTTT', 'ATCG', 'GCTA'])).toBe(true);
    expect(hasMutation(['AAAA', 'GCTA', 'ATCG', 'GCTA'])).toBe(true);
  });

  it('Has vertical mutation', () => {
    expect(hasMutation(['ATCG', 'ACTA', 'ATCG', 'ACTA'])).toBe(true);
    expect(hasMutation(['ATCG', 'GTTA', 'ATCG', 'GTTA'])).toBe(true);
    expect(hasMutation(['ATCG', 'GCCA', 'ATCG', 'GCCA'])).toBe(true);
    expect(hasMutation(['ATCG', 'GCTG', 'ATCG', 'GCTG'])).toBe(true);
  });

  it('Has diagonal mutation', () => {
    // Left to right.
    expect(hasMutation(['ATCG', 'GCGA', 'AGCG', 'GCTA'])).toBe(true);
    expect(hasMutation(['TCGATG', 'TACGGT', 'GATCCA', 'GCTCTT', 'ATCGAT', 'GCTAAT'])).toBe(true);

    // Right to left.
    expect(hasMutation(['ACATTG', 'CATACT', 'AGCTAT', 'GCTATA', 'ATCGTA', 'GCTGGA'])).toBe(true);
    expect(hasMutation(['ACAGTT', 'CATACT', 'GGCTAT', 'GGTATA', 'ATGGTA', 'GCTGGA'])).toBe(true);
  });

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
        hasMutation(['ATGC', 'CAGT', 'TTAT', 123]);
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
