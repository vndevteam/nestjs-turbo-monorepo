import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  SerializeOptions,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthOptional, CurrentUser } from '@repo/api';
import { ProfileResDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  @AuthOptional()
  @SerializeOptions({ type: ProfileResDto })
  getProfile(
    @CurrentUser('id') userId: number,
    @Param('username') username: string,
  ): Promise<ProfileResDto> {
    return this.profileService.getProfile(userId, username);
  }

  @Post(':username/follow')
  @SerializeOptions({ type: ProfileResDto })
  follow(
    @Req() req: any,
    @CurrentUser('id') userId: number,
    @Param('username') username: string,
  ): Promise<ProfileResDto> {
    req.log.info('User is following');
    return this.profileService.follow(userId, username);
  }

  @Delete(':username/follow')
  @SerializeOptions({ type: ProfileResDto })
  unfollow(
    @CurrentUser('id') userId: number,
    @Param('username') username: string,
  ): Promise<ProfileResDto> {
    return this.profileService.unfollow(userId, username);
  }
}
