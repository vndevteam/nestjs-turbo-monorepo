import { SelectQueryBuilder } from 'typeorm';
import { PageOptionsDto } from '../dto/page-pagination/page-options.dto';
import { PagePaginationDto } from '../dto/page-pagination/page-pagination.dto';

export async function paginate<T>(
  builder: SelectQueryBuilder<T>,
  pageOptionsDto: Pick<PageOptionsDto, 'limit' | 'offset' | 'page'>,
  options?: Partial<{
    skipCount: boolean;
    takeAll: boolean;
  }>,
): Promise<[T[], PagePaginationDto]> {
  if (!options?.takeAll) {
    builder.skip(pageOptionsDto.offset).take(pageOptionsDto.limit);
  }

  const entities: T[] = await builder.getMany();

  let count = -1;

  if (!options?.skipCount) {
    count = await builder.getCount();
  }

  const metaDto = new PagePaginationDto(count, pageOptionsDto);

  return [entities, metaDto];
}
