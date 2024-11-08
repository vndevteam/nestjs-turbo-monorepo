import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CommentModule } from './comment/comment.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [CommentModule, FavoriteModule],
})
export class ArticleModule {}
