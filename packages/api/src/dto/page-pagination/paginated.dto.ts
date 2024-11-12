import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PagePaginationDto } from './page-pagination.dto';

export class PagePaginatedDto<TData> {
  @ApiProperty({ type: [Object] })
  @Expose()
  readonly data: TData[];

  @ApiProperty()
  @Expose()
  pagination: PagePaginationDto;

  constructor(data: TData[], meta: PagePaginationDto) {
    this.data = data;
    this.pagination = meta;
  }
}
