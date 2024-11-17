import { ProfileDto } from '@/api/profile/dto/profile.dto';
import {
  BooleanFieldOptional,
  ClassField,
  ClassFieldOptional,
  DateFieldOptional,
  NumberFieldOptional,
  StringField,
  StringFieldOptional,
} from '@repo/api';

export class ArticleDto {
  @StringFieldOptional({ expose: true })
  slug?: string;

  @StringField({ expose: true })
  title: string;

  @StringField({ expose: true })
  description: string;

  @StringField({ expose: true })
  body: string;

  @StringField({ each: true, expose: true })
  tagList: string[];

  @DateFieldOptional({ expose: true })
  createdAt?: Date;

  @DateFieldOptional({ expose: true })
  updatedAt?: Date;

  @BooleanFieldOptional({ expose: true })
  favorited?: boolean;

  @NumberFieldOptional({ expose: true })
  favoritesCount?: number;

  @ClassFieldOptional(() => ProfileDto, { expose: true })
  author?: ProfileDto;
}

export class ArticleResDto {
  @ClassField(() => ArticleDto, { expose: true })
  article: ArticleDto;
}
