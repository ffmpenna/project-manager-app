// errors/CustomErrors.js

// Erro base para personalizar mensagens
class CustomError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Not Found - Recurso não encontrado
class NotFoundError extends CustomError {
  constructor(message = 'Resource not found', details = null) {
    super(message, 404, details);
  }
}

// Bad Request - A requisição não pode ser processada devido a erro do cliente
class BadRequestError extends CustomError {
  constructor(message = 'Bad request', details = null) {
    super(message, 400, details);
  }
}

// Unauthorized - O usuário não tem permissão para acessar o recurso
class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized', details = null) {
    super(message, 401, details);
  }
}

// Forbidden - O servidor entendeu a requisição, mas se recusa a autorizá-la
class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden', details = null) {
    super(message, 403, details);
  }
}

// Conflict - O pedido não pode ser processado devido a conflito no estado atual do recurso
class ConflictError extends CustomError {
  constructor(message = 'Conflict', details = null) {
    super(message, 409, details);
  }
}

// Internal Server Error - Erro inesperado do servidor
class InternalServerError extends CustomError {
  constructor(message = 'Internal Server Error', details = null) {
    super(message, 500, details);
  }
}

// Service Unavailable - O servidor não está pronto para manipular a requisição
class ServiceUnavailableError extends CustomError {
  constructor(message = 'Service unavailable', details = null) {
    super(message, 503, details);
  }
}

// Method Not Allowed - O método HTTP usado na requisição não é suportado pelo servidor
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
