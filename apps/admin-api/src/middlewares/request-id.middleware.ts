import { REQUEST_ID_HEADER } from '@/constants/app.constant';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply['raw'], next: () => void) {
    const requestId = req.id;
    req.log.child({ reqId: requestId });

    if (requestId) {
      res.setHeader(REQUEST_ID_HEADER, requestId);
    }

    next();
  }
}
