import { Catch, HttpException } from '@nestjs/common';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const errorResponse = {
      statusCode: status,
      message: exception.message,
      error: exception.name,
      path: request.url,
    };

    console.error('HTTP exception:', errorResponse);
    response.status(status).json(errorResponse);
  }
}
