import { FastifyLoggerOptions, PinoLoggerOptions } from 'fastify/types/logger';
import hyperid from 'hyperid';

export const REQUEST_ID_HEADER = 'X-Request-Id';

export type FastifyLoggerEnv = 'development' | 'staging' | 'production';

const developmentLogger = (): any => {
  return {
    messageKey: 'msg',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        singleLine: true,
      },
    },
    level: 'debug',
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
        id: req.id,
        path: req.routeOptions.url,
        parameters: req.params,
        headers: req.headers,
      }),
      res(reply) {
        return {
          statusCode: reply.statusCode,
        };
      },
    },
    customSuccessMessage,
    customReceivedMessage,
    customErrorMessage,
  } as FastifyLoggerOptions & PinoLoggerOptions;
};

const customSuccessMessage = (req: any, res: any, responseTime: number) => {
  return `[${req.id || '*'}] "${req.method} ${req.url}" ${res.statusCode} - "${req.headers['host']}" "${req.headers['user-agent']}" - ${responseTime} ms`;
};

const customReceivedMessage = (req: any) => {
  return `[${req.id || '*'}] "${req.method} ${req.url}"`;
};

const customErrorMessage = (req: any, res: any, err: any) => {
  return `[${req.id || '*'}] "${req.method} ${req.url}" ${res.statusCode} - "${req.headers['host']}" "${req.headers['user-agent']}" - message: ${err.message}`;
};

export function genReqId() {
  return (req: any) => req.headers[REQUEST_ID_HEADER] || hyperid().uuid;
}

export function fastifyPinoOptions(
  env: FastifyLoggerEnv,
): FastifyLoggerOptions | boolean {
  const envToLogger = {
    development: developmentLogger(),
    production: {
      level: 'info',
    },
    staging: {
      level: 'info',
    },
  } as const;

  return envToLogger[env] ?? true;
}
