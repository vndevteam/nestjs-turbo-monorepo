import { ClassField, EmailField, StringField } from '@repo/api';

export class UserDto {
  @EmailField({ expose: true })
  email: string;

  @StringField({ expose: true })
  token: string;

  @StringField({ expose: true })
  username: string;

  @StringField({ expose: true })
  bio: string;

  @StringField({ expose: true })
  image: string;
}

export class UserResDto {
  @ClassField(() => UserDto, { expose: true })
  user: UserDto;
}
