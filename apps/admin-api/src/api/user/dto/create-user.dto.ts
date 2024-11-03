import { EmailField, PasswordField, StringField } from '@repo/api';
import { lowerCaseTransformer } from '@repo/utils/transformers/lower-case.transformer';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @StringField()
  @Transform(lowerCaseTransformer)
  readonly username: string;

  @EmailField()
  readonly email: string;

  @PasswordField()
  readonly password: string;
}
