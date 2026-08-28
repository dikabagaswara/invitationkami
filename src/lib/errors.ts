export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 400,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND', 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super('Unauthorized', 'UNAUTHORIZED', 401)
  }
}

export class ForbiddenError extends AppError {
  constructor() {
    super('Forbidden — you do not have access to this resource', 'FORBIDDEN', 403)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 422)
  }
}
