import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { Public } from '@repo/api';
import { UserResDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

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
