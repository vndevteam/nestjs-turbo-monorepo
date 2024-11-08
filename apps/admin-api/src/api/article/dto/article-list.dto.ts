import { Expose, Type } from 'class-transformer';
import { ArticleDto } from './article.dto';

export class ArticleListDto {
  @Expose()
  @Type(() => ArticleDto)
  articles: ArticleDto[];

  @Expose()
  articlesCount: number;
}
