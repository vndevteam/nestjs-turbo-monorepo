import { EmailField, StringField } from '@repo/api';
import { lowerCaseTransformer } from '@repo/utils';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @StringField()
  @Transform(lowerCaseTransformer)
  readonly username: string;

  @EmailField()
  readonly email: string;

  @StringField()
  readonly bio: string;

  @StringField()
  readonly image: string;
}
