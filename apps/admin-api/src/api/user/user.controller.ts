import { Body, Controller, Get, Post, SerializeOptions } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@repo/api/decorators/current-user.decorator';
import { Public } from '@repo/api/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @SerializeOptions({ type: UserResDto })
  getCurrent(
    @CurrentUser() currentUser: { id: number; token: string },
  ): Promise<UserResDto> {
    return this.userService.get(currentUser);
  }

  @Post('users')
  @Public()
  @SerializeOptions({ type: UserResDto })
  async create(@Body('user') userData: CreateUserDto): Promise<UserResDto> {
    return this.userService.create(userData);
  }
}
