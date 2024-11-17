import { StringField } from '@repo/api';

export class TagListResDto {
  @StringField({ each: true, expose: true })
  tags: string[];
}
