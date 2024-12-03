import { Test, TestingModule } from '@nestjs/testing';
import { ProfileResDto } from './dto/profile.dto';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
  let controller: ProfileController;
  let profileService: Partial<Record<keyof ProfileService, jest.Mock>>;

  beforeAll(async () => {
    profileService = {
      getProfile: jest.fn(),
      follow: jest.fn(),
      unfollow: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: profileService,
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  describe('getProfile', () => {
    it('should return a profile', async () => {
      const userId = 1;
      const username = 'testuser';
      const mockProfile: ProfileResDto = {
        profile: {
          username: 'testuser',
          bio: 'test bio',
          image: 'test image',
          following: false,
        },
      };

      profileService.getProfile.mockResolvedValue(mockProfile);

      const result = await controller.getProfile(userId, username);

      expect(result).toEqual(mockProfile);
      expect(profileService.getProfile).toHaveBeenCalledWith(userId, username);
    });

    it('should throw an error if getProfile fails', async () => {
      const userId = 1;
      const username = 'testuser';

      profileService.getProfile.mockRejectedValue(new Error('Service error'));

      await expect(controller.getProfile(userId, username)).rejects.toThrow(
        'Service error',
      );
      expect(profileService.getProfile).toHaveBeenCalledWith(userId, username);
    });
  });

  describe('follow', () => {
    it('should follow a user and return the profile', async () => {
      const userId = 1;
      const username = 'testuser';
      const mockProfile: ProfileResDto = {
        profile: {
          username: 'testuser',
          bio: 'test bio',
          image: 'test image',
          following: true,
        },
      };

      profileService.follow.mockResolvedValue(mockProfile);

      const result = await controller.follow(userId, username);

      expect(result).toEqual(mockProfile);
      expect(profileService.follow).toHaveBeenCalledWith(userId, username);
    });

    it('should throw an error if follow fails', async () => {
      const userId = 1;
      const username = 'testuser';

      profileService.follow.mockRejectedValue(new Error('Follow failed'));

      await expect(controller.follow(userId, username)).rejects.toThrow(
        'Follow failed',
      );
      expect(profileService.follow).toHaveBeenCalledWith(userId, username);
    });
  });

  describe('unfollow', () => {
    it('should unfollow a user and return the profile', async () => {
      const userId = 1;
      const username = 'testuser';
      const mockProfile: ProfileResDto = {
        profile: {
          username: 'testuser',
          bio: 'test bio',
          image: 'test image',
          following: false,
        },
      };

      profileService.unfollow.mockResolvedValue(mockProfile);

      const result = await controller.unfollow(userId, username);

      expect(result).toEqual(mockProfile);
      expect(profileService.unfollow).toHaveBeenCalledWith(userId, username);
    });

    it('should throw an error if unfollow fails', async () => {
      const userId = 1;
      const username = 'testuser';

      profileService.unfollow.mockRejectedValue(new Error('Unfollow failed'));

      await expect(controller.unfollow(userId, username)).rejects.toThrow(
        'Unfollow failed',
      );
      expect(profileService.unfollow).toHaveBeenCalledWith(userId, username);
    });
  });
});
