/* eslint-disable max-classes-per-file */

class HttpError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequest extends HttpError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = {
  BadRequest,
};
