import { Expose, Type } from 'class-transformer';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  token: string;

  @Expose()
  username: string;

  @Expose()
  bio: string;

  @Expose()
  image: string;
}

export class UserResDto {
  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
