jest.mock('../database/client');

const { client } = require('infra/database/client');
const mutationRepository = require('infra/repositories/mutation-repository');

describe('infra.repositories.mutationRepository', () => {
  describe('create', () => {
    it('Calls `put` with right data', async () => {
      const id = 'test-id';
      const mutated = true;

      await mutationRepository.create(id, mutated);

      expect(client.put).toHaveBeenCalledWith({
        TableName: 'mutation',
        Item: {
          id,
          mutated,
          createdAt: expect.any(Number),
          updatedAt: expect.any(Number),
        },
      });
    });
  });

  describe('findById', () => {
    it('Calls `get` with right data', async () => {
      const id = 'test-id';

      await mutationRepository.findById(id);

      expect(client.get).toHaveBeenCalledWith({
        TableName: 'mutation',
        Key: {
          id,
        },
      });
    });
  });
});
