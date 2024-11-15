import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DEFAULT_PAGE_LIMIT, Order } from '../../constants';
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
    pageOptions: PageOptionsDto = {
      limit: DEFAULT_PAGE_LIMIT,
      offset: 0,
      order: Order.ASC,
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
