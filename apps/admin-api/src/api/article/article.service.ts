import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '@repo/database-typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async list() {
    this.articleRepository.find();
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
