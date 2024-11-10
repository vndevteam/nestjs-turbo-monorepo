import { FastifyLoggerOptions, PinoLoggerOptions } from 'fastify/types/logger';
import { Environment } from 'src/constants';

const developmentLogger = () =>
  ({
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
        id: req.id, // Bao gồm `reqId` trong log
      }),
    },
    customSuccessMessage,
  }) as FastifyLoggerOptions & PinoLoggerOptions;

const customSuccessMessage = (req, res, responseTime: number) => {
  return `[${req.id || '*'}] "${req.method} ${req.url}" ${res.statusCode} - "${req.headers['host']}" "${req.headers['user-agent']}" - ${responseTime} ms`;
};

export function fastifyPinoLogger(env: Environment) {
  const envToLogger = {
    development: developmentLogger,
    production: {
      level: 'info',
    },
  } as const;

  return envToLogger[env] ?? true;
}
