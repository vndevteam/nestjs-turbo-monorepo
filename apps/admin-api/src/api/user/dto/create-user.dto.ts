import { EmailField, PasswordField, StringField } from '@repo/api';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../../../../../packages/common/dist';

export class CreateUserDto {
  @StringField()
  @Transform(lowerCaseTransformer)
  readonly username: string;

  @EmailField()
  readonly email: string;

  @PasswordField()
  readonly password: string;
}
