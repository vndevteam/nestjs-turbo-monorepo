import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  async create(_slug: string) {
    throw new Error('Method not implemented.');
  }

  async list(_slug: string) {
    throw new Error('Method not implemented.');
  }

  async delete(_slug: string, _id: string) {
    throw new Error('Method not implemented.');
  }
}
