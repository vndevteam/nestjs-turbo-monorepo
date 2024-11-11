import { FastifyLoggerOptions, PinoLoggerOptions } from 'fastify/types/logger';
import hyperid from 'hyperid';

export const REQUEST_ID_HEADER = 'X-Request-Id';

type Env = 'development' | 'staging' | 'production';

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
  } as FastifyLoggerOptions & PinoLoggerOptions;
};

const customSuccessMessage = (req: any, res: any, responseTime: number) => {
  return `[${req.id || '*'}] "${req.method} ${req.url}" ${res.statusCode} - "${req.headers['host']}" "${req.headers['user-agent']}" - ${responseTime} ms`;
};

export function genReqId() {
  return (req: any) => req.headers[REQUEST_ID_HEADER] || hyperid().uuid;
}

export function fastifyPinoOptions(env: Env) {
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
