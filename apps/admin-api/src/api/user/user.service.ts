import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  create(dto: CreateUserDto) {
    const { username, email, password } = dto;
  }
}
