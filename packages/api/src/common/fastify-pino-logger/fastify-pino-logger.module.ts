import { Global, Module } from '@nestjs/common';
import { FastifyPinoLoggerService } from './fastify-pino-logger.service';

@Global()
@Module({
  providers: [FastifyPinoLoggerService],
  exports: [FastifyPinoLoggerService],
})
export class FastifyPinoLoggerModule {}
