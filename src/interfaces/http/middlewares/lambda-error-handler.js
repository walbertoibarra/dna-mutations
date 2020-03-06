const lambdaErrorHandler = (handler) => async (event, context) => {
  try {
    const response = await handler(event, context);

    return response;
  } catch (error) {
    return {
      statusCode: error.statusCode || error.status || 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};

module.exports = lambdaErrorHandler;
