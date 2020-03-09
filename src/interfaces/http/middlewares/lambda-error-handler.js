const lambdaErrorHandler = (handler) => async (event, context) => {
  try {
    const response = await handler(event, context);

    return response;
  } catch (error) {
    const defaultStatusCode = 500;
    const statusCode = error.statusCode || error.status || defaultStatusCode;
    const message = statusCode >= defaultStatusCode ? 'Something unexpected happened' : error.message;

    return {
      statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
      }),
    };
  }
};

module.exports = lambdaErrorHandler;
