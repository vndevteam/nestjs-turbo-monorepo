import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '@repo/database-typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let userRepositoryValue: Partial<
    Record<keyof Repository<UserEntity>, jest.Mock>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryValue,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
