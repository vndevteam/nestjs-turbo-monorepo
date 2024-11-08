import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
