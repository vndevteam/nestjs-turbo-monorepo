import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DEFAULT_CURRENT_OFFSET, DEFAULT_PAGE_LIMIT } from '../../constants';
import { PageOptionsDto } from './page-options.dto';

export class OffsetPaginationDto {
  @ApiProperty()
  @Expose()
  readonly limit: number;

  @ApiProperty()
  @Expose()
  readonly offset: number;

  @ApiProperty()
  @Expose()
  readonly nextOffset?: number;

  @ApiProperty()
  @Expose()
  readonly previousOffset?: number;

  @ApiProperty()
  @Expose()
  readonly totalRecords: number;

  @ApiProperty()
  @Expose()
  readonly totalPages: number;

  constructor(
    totalRecords: number,
    pageOptions: Pick<PageOptionsDto, 'limit' | 'offset'> = {
      limit: DEFAULT_PAGE_LIMIT,
      offset: DEFAULT_CURRENT_OFFSET,
    },
  ) {
    this.limit = pageOptions.limit;
    this.offset = pageOptions.offset;
    this.totalRecords = totalRecords;
    this.nextOffset =
      this.offset + this.limit < totalRecords
        ? this.offset + this.limit
        : undefined;
    this.previousOffset =
      this.offset - this.limit >= 0 ? this.offset - this.limit : undefined;
    this.totalPages =
      this.limit > 0 ? Math.ceil(totalRecords / pageOptions.limit) : 0;
  }
}
