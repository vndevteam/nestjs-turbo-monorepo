import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tag')
@Controller('tag')
export class TagController {}
