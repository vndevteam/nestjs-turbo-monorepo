import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@repo/database-typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get(currentUser: { id: number; token: string }): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: currentUser.id });

    return { user: { ...user, token: currentUser.token } };
  }

  async create(dto: CreateUserDto): Promise<UserResDto> {
    const { username, email, password } = dto;

    const user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userRepository.create({ username, email, password });
    const savedUser = await this.userRepository.save(newUser);

    return {
      user: {
        ...savedUser,
        token: await this.authService.createToken({ id: savedUser.id }),
      },
    };
  }

  async update(userId: number, userData: UpdateUserDto): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update({ id: userId }, userData);

    return {
      user: {
        ...user,
      },
    };
  }
}
