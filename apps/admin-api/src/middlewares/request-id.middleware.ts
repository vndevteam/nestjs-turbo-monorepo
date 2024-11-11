import { Injectable, NestMiddleware } from '@nestjs/common';
import { REQUEST_ID_HEADER } from '@repo/nest-common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply['raw'], next: () => void) {
    const requestId = req.id;

    if (requestId) {
      res.setHeader(REQUEST_ID_HEADER, requestId);
    }

    next();
  }
}
