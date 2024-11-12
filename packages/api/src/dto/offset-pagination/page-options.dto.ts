import { DEFAULT_PAGE_LIMIT, Order } from '../../constants';
import {
  EnumFieldOptional,
  NumberFieldOptional,
  StringFieldOptional,
} from '../../decorators';

export class PageOptionsDto {
  @NumberFieldOptional({
    minimum: 1,
    default: DEFAULT_PAGE_LIMIT,
    int: true,
  })
  readonly limit: number = DEFAULT_PAGE_LIMIT;

  @NumberFieldOptional({
    minimum: 0,
    default: 0,
    int: true,
  })
  readonly offset: number = 0;

  @StringFieldOptional()
  readonly q?: string;

  @EnumFieldOptional(() => Order, { default: Order.ASC })
  readonly order: Order = Order.ASC;
}
