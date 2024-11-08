import { Expose, Type } from 'class-transformer';

export class ProfileDto {
  @Expose()
  username: string;

  @Expose()
  bio: string;

  @Expose()
  image: string;

  @Expose()
  following: boolean;
}

export class ProfileResDto {
  @Expose()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
