import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { type FastifyBaseLogger } from 'fastify';
import { AsyncContextProvider } from '../../providers/async-context.provider';

@Injectable({ scope: Scope.TRANSIENT })
export class FastifyPinoLogger extends ConsoleLogger {
  constructor(
    private readonly asyncContext: AsyncContextProvider,
    private readonly logger: FastifyBaseLogger,
  ) {
    super();
  }

  log(message: string) {
    const requestLogger =
      this.asyncContext.get<FastifyBaseLogger>('log') || this.logger;
    if (requestLogger) {
      requestLogger.info(message);
    } else {
      super.log(message);
    }
  }

  error(message: string, trace?: string) {
    const requestLogger =
      this.asyncContext.get<FastifyBaseLogger>('log') || this.logger;
    if (requestLogger) {
      requestLogger.error({ trace }, message);
    } else {
      super.error(message, trace);
    }
  }

  warn(message: string) {
    const requestLogger =
      this.asyncContext.get<FastifyBaseLogger>('log') || this.logger;
    if (requestLogger) {
      requestLogger.warn(message);
    } else {
      super.warn(message);
    }
  }

  debug(message: string) {
    const requestLogger =
      this.asyncContext.get<FastifyBaseLogger>('log') || this.logger;

    if (requestLogger) {
      requestLogger.debug(message);
    } else {
      super.debug(message);
    }
  }

  verbose(message: string) {
    const requestLogger =
      this.asyncContext.get<FastifyBaseLogger>('log') || this.logger;
    if (requestLogger) {
      requestLogger.trace(message);
    } else {
      super.verbose(message);
    }
  }
}
