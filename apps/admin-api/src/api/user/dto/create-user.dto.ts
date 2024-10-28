import { StringField } from '@repo/utils/decorators/field.decorators';
import { lowerCaseTransformer } from '@repo/utils/transformers/lower-case.transformer';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @StringField()
  @Transform(lowerCaseTransformer)
  username: string;
  email: string;
  password: string;
}
