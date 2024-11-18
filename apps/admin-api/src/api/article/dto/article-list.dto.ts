import {
  ClassField,
  NumberField,
  NumberFieldOptional,
  StringFieldOptional,
} from '@repo/api';
import { OffsetPaginationDto } from '@repo/api/dto/offset-pagination/offset-pagination.dto';
import { PageOptionsDto } from '@repo/api/dto/offset-pagination/page-options.dto';
import { ArticleDto } from './article.dto';

export class ArticleListReqDto extends PageOptionsDto {
  @StringFieldOptional({ minLength: 0 })
  readonly tag?: string;

  @StringFieldOptional({ minLength: 0 })
  readonly author?: string;

  @StringFieldOptional({ minLength: 0 })
  readonly favorited?: string;

  @NumberFieldOptional({
    minimum: 1,
    default: 20,
    int: true,
  })
  override readonly limit: number = 20;

  @NumberFieldOptional({
    minimum: 0,
    default: 0,
    int: true,
  })
  override readonly offset: number = 0;
}

export class ArticleListResDto {
  @ClassField(() => ArticleDto, { isArray: true, expose: true })
  articles: ArticleDto[];

  @NumberField({ expose: true })
  articlesCount: number;

  @ClassField(() => OffsetPaginationDto, { expose: true })
  pagination: OffsetPaginationDto;
}
