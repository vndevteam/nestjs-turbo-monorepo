import {
  EmailField,
  lowerCaseTransformer,
  PasswordField,
  StringField,
} from '@repo/api';
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
