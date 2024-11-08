import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  async create(_slug: string) {
    throw new Error('Method not implemented.');
  }

  async delete(_slug: string) {
    throw new Error('Method not implemented.');
  }
}
