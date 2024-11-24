import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { ApiBody, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ApiPublic } from '@repo/api/decorators/http.decorators';
import { UserResDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/login')
  @ApiPublic({
    type: UserResDto,
    summary: 'Sign in',
  })
  @ApiBody({
    description: 'User login request',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          $ref: getSchemaPath(LoginReqDto),
        },
      },
      required: ['user'],
    },
  })
  @SerializeOptions({ type: UserResDto })
  async login(@Body('user') userData: LoginReqDto): Promise<UserResDto> {
    return this.authService.login(userData);
  }
}
