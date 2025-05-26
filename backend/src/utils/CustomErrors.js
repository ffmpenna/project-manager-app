class CustomError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Resource not found', details = null) {
    super(message, 404, details);
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Bad request', details = null) {
    super(message, 400, details);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized', details = null) {
    super(message, 401, details);
  }
}

class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden', details = null) {
    super(message, 403, details);
  }
}

class ConflictError extends CustomError {
  constructor(message = 'Conflict', details = null) {
    super(message, 409, details);
  }
}

class InternalServerError extends CustomError {
  constructor(message = 'Internal Server Error', details = null) {
    super(message, 500, details);
  }
}

class ServiceUnavailableError extends CustomError {
  constructor(message = 'Service unavailable', details = null) {
    super(message, 503, details);
  }
}

class MethodNotAllowedError extends CustomError {
  constructor(message = 'Method Not Allowed', details = null) {
    super(message, 405, details);
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  InternalServerError,
  ServiceUnavailableError,
  MethodNotAllowedError,
};
