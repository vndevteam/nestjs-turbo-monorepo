import { ProfileDto } from '@/api/profile/dto/profile.dto';
import { ClassField, DateField, NumberField, StringField } from '@repo/api';

export class CommentDto {
  @NumberField({ expose: true })
  id: number;

  @StringField({ expose: true })
  body: string;

  @DateField({ expose: true })
  createdAt: Date;

  @DateField({ expose: true })
  updatedAt: Date;

  @ClassField(() => ProfileDto, { expose: true })
  author: ProfileDto;
}

export class CommentResDto {
  @ClassField(() => CommentDto, { expose: true })
  comment: CommentDto;
}
