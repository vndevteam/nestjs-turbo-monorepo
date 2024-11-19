import { StringField } from '@repo/api';

export class CreateCommentReqDto {
  @StringField({ minLength: 1, maxLength: 1000 })
  readonly body: string;
}
