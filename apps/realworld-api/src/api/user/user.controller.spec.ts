import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';
import { CreateUserReqDto } from './dto/create-user.dto';
import { UserResDto } from './dto/user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const validateDto = async (
  dto: object,
  options: ValidatorOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: false,
  },
) => {
  return await validate(dto, options);
};

describe('UserController', () => {
  let controller: UserController;
  let userService: Partial<Record<keyof UserService, jest.Mock>>;

  beforeAll(async () => {
    userService = {
      get: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('getCurrent', () => {
    it('should return the current user', async () => {
      const currentUser = { id: 1, token: 'token' };
      const userResDto = new UserResDto();
      userService.get.mockResolvedValue(userResDto);

      const result = await controller.getCurrent(currentUser);

      expect(result).toBe(userResDto);
      expect(userService.get).toHaveBeenCalledWith(currentUser);
    });

    it('should throw an error if userService.get fails', async () => {
      const currentUser = { id: 1, token: 'token' };
      userService.get.mockRejectedValue(new Error('Service error'));

      await expect(controller.getCurrent(currentUser)).rejects.toThrow(
        'Service error',
      );
      expect(userService.get).toHaveBeenCalledWith(currentUser);
    });
  });

  describe('create', () => {
    it('should create a new user and return the user data', async () => {
      const createUserReqDto = new CreateUserReqDto();
      const userResDto = new UserResDto();
      userService.create.mockResolvedValue(userResDto);

      const result = await controller.create(createUserReqDto);

      expect(result).toBe(userResDto);
      expect(userService.create).toHaveBeenCalledWith(createUserReqDto);
    });

    it('should throw an error if userService.create fails', async () => {
      const createUserReqDto = new CreateUserReqDto();
      userService.create.mockRejectedValue(new Error('Service error'));

      await expect(controller.create(createUserReqDto)).rejects.toThrow(
        'Service error',
      );
      expect(userService.create).toHaveBeenCalledWith(createUserReqDto);
    });

    describe('CreateUserReqDto', () => {
      it('should validate a valid DTO', async () => {
        const dto = plainToInstance(CreateUserReqDto, {
          username: 'validUsername',
          password: 'validPassword',
          email: 'valid@example.com',
        });

        const errors = await validateDto(dto, {
          whitelist: true,
          forbidNonWhitelisted: true,
        });
        expect(errors.length).toBe(0);
      });

      it('should fail validation if username is missing', async () => {
        const dto = plainToInstance(CreateUserReqDto, {
          password: 'validPassword',
          email: 'valid@example.com',
        });

        const errors = await validateDto(dto, {
          whitelist: true,
          forbidNonWhitelisted: true,
        });
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('username');
      });

      it('should fail validation if password is missing', async () => {
        const dto = plainToInstance(CreateUserReqDto, {
          username: 'validUsername',
          email: 'valid@example.com',
        });

        const errors = await validateDto(dto, {
          whitelist: true,
          forbidNonWhitelisted: true,
        });
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('password');
      });

      it('should fail validation if email is missing', async () => {
        const dto = plainToInstance(CreateUserReqDto, {
          username: 'validUsername',
          password: 'validPassword',
        });

        const errors = await validateDto(dto, {
          whitelist: true,
          forbidNonWhitelisted: true,
        });
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('email');
      });

      it('should fail validation if email is invalid', async () => {
        const dto = plainToInstance(CreateUserReqDto, {
          username: 'validUsername',
          password: 'validPassword',
          email: 'invalidEmail',
        });

        const errors = await validateDto(dto, {
          whitelist: true,
          forbidNonWhitelisted: true,
        });
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('email');
      });
    });
  });
});
