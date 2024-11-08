import { Controller, Delete, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('articles/:slug/favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async create(@Param('slug') slug: string) {
    return await this.favoriteService.create(slug);
  }

  @Delete()
  async delete(@Param('slug') slug: string) {
    return await this.favoriteService.delete(slug);
  }
}
