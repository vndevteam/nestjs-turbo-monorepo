import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  constructor() {}

  async list() {
    throw new Error('Method not implemented.');
  }

  async feed() {
    throw new Error('Method not implemented.');
  }

  async get(_slug: string) {
    throw new Error('Method not implemented.');
  }

  async create() {
    throw new Error('Method not implemented.');
  }

  async delete(_slug: string) {
    throw new Error('Method not implemented.');
  }

  async update(_slug: string) {
    throw new Error('Method not implemented.');
  }
}
