import { validateDto } from '@/utils/unit-test.util';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { UserResDto } from '../user/dto/user.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<Record<keyof AuthService, jest.Mock>>;

  beforeAll(async () => {
    authService = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return the user data', async () => {
      const loginReqDto = {
        email: 'test@example.com',
        password: 'password',
      };

      const userResDto: UserResDto = {
        user: {
          email: 'test@example.com',
          token: 'token',
          username: 'testuser',
          bio: 'test bio',
          image: 'test image',
        },
      };

      authService.login.mockReturnValue(userResDto);

      const result = await controller.login(loginReqDto);

      expect(result).toBe(userResDto);
    });

    it('should throw an error if login fails', async () => {
      const loginReqDto = {
        email: 'test@example.com',
        password: 'password',
      };

      authService.login.mockRejectedValue(new Error('Login failed'));

      await expect(controller.login(loginReqDto)).rejects.toThrow(
        'Login failed',
      );
      expect(authService.login).toHaveBeenCalledWith(loginReqDto);
    });

    describe('LoginReqDto', () => {
      it('should validateDto successfully with valid data', async () => {
        const validData = {
          email: 'test@example.com',
          password: 'password123',
        };

        const dto = plainToInstance(LoginReqDto, validData);
        const errors = await validateDto(dto);

        expect(errors.length).toBe(0);
      });

      it('should fail validation if email is missing', async () => {
        const invalidData = {
          password: 'password123',
        };

        const dto = plainToInstance(LoginReqDto, invalidData);
        const errors = await validateDto(dto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('email');
      });

      it('should fail validation if password is missing', async () => {
        const invalidData = {
          email: 'test@example.com',
        };

        const dto = plainToInstance(LoginReqDto, invalidData);
        const errors = await validateDto(dto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('password');
      });

      it('should fail validation if email is not valid', async () => {
        const invalidData = {
          email: 'invalidEmail',
          password: 'password123',
        };

        const dto = plainToInstance(LoginReqDto, invalidData);
        const errors = await validateDto(dto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('email');
      });

      it('should fail validation if password is too short', async () => {
        const invalidData = {
          email: 'test@example.com',
          password: 'short',
        };

        const dto = plainToInstance(LoginReqDto, invalidData);
        const errors = await validateDto(dto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('password');
      });
    });
  });
});
