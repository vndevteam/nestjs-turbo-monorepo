import { FastifyLoggerOptions, PinoLoggerOptions } from 'fastify/types/logger';
import { Environment } from '../../constants';

type Env = Environment;

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

const customSuccessMessage = (req, res, responseTime: number) => {
  return `[${req.id || '*'}] "${req.method} ${req.url}" ${res.statusCode} - "${req.headers['host']}" "${req.headers['user-agent']}" - ${responseTime} ms`;
};

export function fastifyPinoOptions(env: Env) {
  const envToLogger = {
    development: developmentLogger(),
    production: {
      level: 'info',
    },
  } as const;

  return envToLogger[env] ?? true;
}
