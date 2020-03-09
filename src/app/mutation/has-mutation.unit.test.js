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
});
