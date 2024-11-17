import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '@repo/api/decorators/http.decorators';
import { TagListResDto } from './dto/tag-list.dto';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiAuth({
    summary: 'Get Tags',
    type: TagListResDto,
    isAuthOptional: true,
  })
  async list(): Promise<TagListResDto> {
    return await this.tagService.list();
  }
}
