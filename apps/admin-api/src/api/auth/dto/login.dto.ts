import { EmailField, PasswordField } from '@repo/api';

export class LoginDto {
  @EmailField()
  readonly email: string;

  @PasswordField()
  readonly password: string;
}
