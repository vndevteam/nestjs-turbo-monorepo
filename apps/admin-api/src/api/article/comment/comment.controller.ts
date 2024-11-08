import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';

@ApiTags('Comment')
@Controller('articles/:slug/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Param('slug') slug: string) {
    return await this.commentService.create(slug);
  }

  @Get()
  async list(@Param('slug') slug: string) {
    return await this.commentService.list(slug);
  }

  @Delete(':id')
  async delete(@Param('slug') slug: string, @Param('id') id: string) {
    return await this.commentService.delete(slug, id);
  }
}
