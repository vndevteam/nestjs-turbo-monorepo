import { EmailField, PasswordField } from '@repo/api';

export class LoginReqDto {
  @EmailField()
  readonly email: string;

  @PasswordField()
  readonly password: string;
}
