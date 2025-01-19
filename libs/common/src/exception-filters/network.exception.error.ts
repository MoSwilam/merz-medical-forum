import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error) // Catch all errors
export class NetworkExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Check if the error is a network-related error (e.g., ERR_MISSING_ARGS)
    if (exception.message.includes('ERR_MISSING_ARGS')) {
      response.status(503).json({
        statusCode: 503,
        message:
          'Microservice connection failed: missing arguments or incorrect configuration.',
        error: 'Service Unavailable',
        path: request.url,
      });
    } else {
      // For any other uncaught error, return a generic server error response
      response.status(500).json({
        statusCode: 1009,
        message: exception.message || 'Internal server error',
        error: exception.name || 'UnknownError',
        path: request.url,
      });
    }

    // Log the error for debugging purposes
    console.error('====================');
    console.error('General Error:', exception);
    console.error('====================');
  }
}
