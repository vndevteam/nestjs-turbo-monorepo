import { PartialType } from '@nestjs/swagger';
import { CreateArticleReqDto } from './create-article.dto';

export class UpdateArticleReqDto extends PartialType(CreateArticleReqDto) {}
