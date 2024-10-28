import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  createUser(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
}
