import { HttpException, HttpStatus } from '@nestjs/common'

export class AppException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super({ success: false, message }, status)
  }
}

// Tayyor exceptionlar
export class NotFoundException extends AppException {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, HttpStatus.NOT_FOUND)
  }
}

export class UnauthorizedException extends AppException {
  constructor() {
    super('Unauthorized', HttpStatus.UNAUTHORIZED)
  }
}

export class ConflictException extends AppException {
  constructor(message = 'Already exists') {
    super(message, HttpStatus.CONFLICT)
  }
}