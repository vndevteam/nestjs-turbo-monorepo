import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { type FastifyBaseLogger } from 'fastify';
import pino from 'pino';
import { AsyncContextProvider } from './async-context.provider';

@Injectable({ scope: Scope.TRANSIENT })
export class FastifyPinoLogger extends ConsoleLogger {
  protected readonly contextName: string = 'context';
  private readonly messageKey: string;
  private readonly errorKey: string;

  constructor(
    private readonly asyncContext: AsyncContextProvider,
    private readonly logger: FastifyBaseLogger,
  ) {
    super();
    this.messageKey =
      (this.logger as any)[pino.symbols.messageKeySym as any] || 'msg';
    this.errorKey =
      (this.logger as any)[pino.symbols.errorKeySym as any] || 'err';
  }

  private formatMsg(message: any) {
    return typeof message === 'string' ? message : JSON.stringify(message);
  }

  private logWithErrLevel(
    level: 'info' | 'warn' | 'debug' | 'trace' | 'error' | 'fatal',
    message: any,
    context?: string,
    ...optionalParams: any[]
  ) {
    const reqLogger = this.getRequestLogger();
    const formattedMessage = this.formatMsg(message);

    const extra =
      optionalParams.length === 0 ||
      optionalParams.every((param) => param == null)
        ? undefined
        : optionalParams;

    const logObject = {
      [this.messageKey]: formattedMessage,
      [this.contextName]: context,
      ...(extra && { extra }),
    } as Record<string, any>;

    if (message instanceof Error) {
      logObject[this.messageKey] = message.message;
      logObject[this.errorKey] = message;
    }

    reqLogger[level](logObject);
  }

  private logMessage(
    level: 'info' | 'warn' | 'debug' | 'trace' | 'error' | 'fatal',
    message: any,
    contextOrParams?: string | any,
    ...optionalParams: any[]
  ) {
    const context =
      typeof contextOrParams === 'string' ? contextOrParams : undefined;
    const additionalParams = context
      ? optionalParams
      : [contextOrParams, ...optionalParams];
    this.logWithErrLevel(level, message, context, ...additionalParams);
  }

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: [...any, string?]): void;
  log(
    message: any,
    contextOrParams?: string | any,
    ...optionalParams: any[]
  ): void {
    this.logMessage('info', message, contextOrParams, ...optionalParams);
  }

  error(message: any, stackOrContext?: string, context?: string): void;
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: [...any, string?, string?]): void;
  error(
    message: any,
    stackOrContext?: string | any,
    contextOrParams?: string | any,
    ...optionalParams: any[]
  ): void {
    const stack =
      typeof stackOrContext === 'string' ? stackOrContext : undefined;
    const context =
      typeof contextOrParams === 'string' ? contextOrParams : undefined;
    const additionalParams = context
      ? optionalParams
      : [contextOrParams, ...optionalParams];
    this.logWithErrLevel('error', message, context, stack, ...additionalParams);
  }

  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: [...any, string?]): void;
  warn(
    message: any,
    contextOrParams?: string | any,
    ...optionalParams: any[]
  ): void {
    this.logMessage('warn', message, contextOrParams, ...optionalParams);
  }

  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: [...any, string?]): void;
  debug(
    message: any,
    contextOrParams?: string | any,
    ...optionalParams: any[]
  ): void {
    this.logMessage('debug', message, contextOrParams, ...optionalParams);
  }

  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: [...any, string?]): void;
  verbose(
    message: any,
    contextOrParams?: string | any,
    ...optionalParams: any[]
  ): void {
    this.logMessage('trace', message, contextOrParams, ...optionalParams);
  }

  fatal(message: any, context?: string): void;
  fatal(message: any, ...optionalParams: [...any, string?]): void;
  fatal(
    message: any,
    contextOrParams?: string | any,
    ...optionalParams: any[]
  ): void {
    this.logMessage('fatal', message, contextOrParams, ...optionalParams);
  }

  private getRequestLogger(): FastifyBaseLogger {
    return this.asyncContext.get<FastifyBaseLogger>('log') || this.logger;
  }
}
