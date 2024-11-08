import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@repo/api';
import { UserResDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/login')
  @Public()
  @SerializeOptions({ type: UserResDto })
  async login(@Body('user') userData: LoginDto): Promise<UserResDto> {
    return this.authService.login(userData);
  }
}
