const { hashString } = require('domain/lib/crypto');

describe('domain.lib.crypto', () => {
  describe('hashString', () => {
    it('Creates the same hash when given same string', () => {
      const str = 'test';
      const hash1 = hashString(str);
      const hash2 = hashString(str);

      expect(hash1).toBe(hash2);
      expect(hash1).toBe('098f6bcd4621d373cade4e832627b4f6');
    });
  });
});
