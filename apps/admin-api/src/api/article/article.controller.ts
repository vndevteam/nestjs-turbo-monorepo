import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';

@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async list() {
    return await this.articleService.list();
  }

  @Get('feed')
  async feed() {
    return await this.articleService.feed();
  }

  @Get(':slug')
  async get(@Param('slug') slug: string) {
    return await this.articleService.get(slug);
  }

  @Post()
  async create() {
    return await this.articleService.create();
  }

  @Put(':slug')
  async update(@Param('slug') slug: string) {
    return await this.articleService.update(slug);
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    return await this.articleService.delete(slug);
  }
}
