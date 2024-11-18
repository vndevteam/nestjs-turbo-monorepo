import { NumberFieldOptional } from '@repo/api';
import { PageOptionsDto } from '@repo/api/dto/offset-pagination/page-options.dto';

export class ArticleFeedReqDto extends PageOptionsDto {
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
