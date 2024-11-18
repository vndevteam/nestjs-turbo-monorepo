import { ClassField } from '@repo/api';
import { CommentDto } from './comment.dto';

export class CommentListResDto {
  @ClassField(() => CommentDto, { isArray: true, expose: true })
  comments: CommentDto[];
}
