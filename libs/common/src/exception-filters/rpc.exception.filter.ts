import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class MicroserviceExceptionsFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const rpc = host.switchToRpc();
    const ctx = rpc.getContext();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 999; // Default to 500 for other errors

    const errorResponse = {
      statusCode: status,
      message:
        exception.message || 'Microservice exception filter caught an error',
      error: exception.name || 'Ambiguous',
      path: 'N/A', // Path is not available in RPC, so it’s set to 'N/A'
    };

    console.error('Microservice error:', errorResponse);
    response.status(500).json(errorResponse);
  }
}
