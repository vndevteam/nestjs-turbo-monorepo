import { ClassField, StringField } from '@repo/api';

export class ProfileDto {
  @StringField({ expose: true })
  username: string;

  @StringField({ expose: true })
  bio: string;

  @StringField({ expose: true })
  image: string;

  @StringField({ expose: true })
  following: boolean;
}

export class ProfileResDto {
  @ClassField(() => ProfileDto, { expose: true })
  profile: ProfileDto;
}
