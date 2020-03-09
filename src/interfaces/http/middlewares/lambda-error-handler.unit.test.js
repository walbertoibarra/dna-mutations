const lambdaErrorHandler = require('interfaces/http/middlewares/lambda-error-handler');

describe('interfaces > http > middlewares > lambdaErrorHandler', () => {
  it('When invoked, it returns a lambda handler function', () => {
    const handler = lambdaErrorHandler();

    expect(handler).toEqual(expect.any(Function));
  });

  it('When the error handler is invoked, it should then invoke the passed in handler', async () => {
    const handlerStub = jest.fn(async () => { });
    const handler = lambdaErrorHandler(handlerStub);
    const event = { };
    const context = { };

    await handler(event, context);

    expect(handlerStub).toHaveBeenCalled();
    expect(handlerStub).toHaveBeenCalledWith(event, context);
  });

  it('When the passed in handler throws an error, the handler should format a response', async () => {
    const handler = lambdaErrorHandler(() => { throw new Error('boom'); });

    await expect(handler()).resolves.toEqual({
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: '{"message":"Something unexpected happened"}',
    });
  });
});
