import { EmailField, lowerCaseTransformer, StringField } from '@repo/api';
import { Transform } from 'class-transformer';
import { IsUrl } from 'class-validator';

export class UpdateUserDto {
  @StringField()
  @Transform(lowerCaseTransformer)
  readonly username: string;

  @EmailField()
  readonly email: string;

  @StringField()
  readonly bio: string;

  @StringField()
  @IsUrl()
  readonly image: string;
}
