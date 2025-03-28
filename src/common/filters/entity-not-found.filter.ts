import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch(EntityNotFoundError, QueryFailedError)
export class EntityExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError | QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    if (exception instanceof EntityNotFoundError) {
      return response.status(404).json({
        statusCode: 404,
        message: 'Resource not found',
        error: 'Not Found',
      });
    }
    
    // Handle database query errors (including invalid UUID format)
    if (exception instanceof QueryFailedError) {
      const error = exception as any;
      
      // Handle invalid UUID format errors specifically
      if (error.message && error.message.includes('invalid input syntax for type uuid')) {
        return response.status(400).json({
          statusCode: 400,
          message: 'Invalid ID format. The ID must be a valid UUID.',
          error: 'Bad Request',
        });
      }
      
      // Handle other database errors
      return response.status(400).json({
        statusCode: 400,
        message: 'Database query failed',
        error: 'Bad Request',
      });
    }
  }
} 