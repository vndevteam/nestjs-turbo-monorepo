import { Test, TestingModule } from '@nestjs/testing';
import { ArticleResDto } from '../dto/article.dto';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

describe('FavoriteController', () => {
  let controller: FavoriteController;
  let favoriteService: Partial<Record<keyof FavoriteService, jest.Mock>>;

  beforeAll(async () => {
    favoriteService = {
      create: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteController],
      providers: [
        {
          provide: FavoriteService,
          useValue: favoriteService,
        },
      ],
    }).compile();

    controller = module.get<FavoriteController>(FavoriteController);
  });

  describe('create', () => {
    it('should favorite an article and return the article data', async () => {
      const userId = 1;
      const slug = 'test-article';
      const mockArticle: ArticleResDto = {
        article: {
          slug: 'test-article',
          title: 'Test Article',
          description: 'Test Description',
          body: 'Test Body',
          tagList: ['nestjs', 'testing'],
          createdAt: new Date(),
          updatedAt: new Date(),
          favorited: true,
          favoritesCount: 1,
          author: {
            username: 'testuser',
            bio: 'test bio',
            image: 'http://example.com/image.jpg',
            following: false,
          },
        },
      };

      favoriteService.create.mockResolvedValue(mockArticle);

      const result = await controller.create(userId, slug);

      expect(result).toEqual(mockArticle);
      expect(favoriteService.create).toHaveBeenCalledWith(slug, userId);
    });

    it('should throw an error if create fails', async () => {
      const userId = 1;
      const slug = 'test-article';

      favoriteService.create.mockRejectedValue(new Error('Create failed'));

      await expect(controller.create(userId, slug)).rejects.toThrow(
        'Create failed',
      );
      expect(favoriteService.create).toHaveBeenCalledWith(slug, userId);
    });
  });

  describe('delete', () => {
    it('should unfavorite an article and return the article data', async () => {
      const userId = 1;
      const slug = 'test-article';
      const mockArticle: ArticleResDto = {
        article: {
          slug: 'test-article',
          title: 'Test Article',
          description: 'Test Description',
          body: 'Test Body',
          tagList: ['nestjs', 'testing'],
          createdAt: new Date(),
          updatedAt: new Date(),
          favorited: false,
          favoritesCount: 0,
          author: {
            username: 'testuser',
            bio: 'test bio',
            image: 'http://example.com/image.jpg',
            following: false,
          },
        },
      };

      favoriteService.delete.mockResolvedValue(mockArticle);

      const result = await controller.delete(userId, slug);

      expect(result).toEqual(mockArticle);
      expect(favoriteService.delete).toHaveBeenCalledWith(slug, userId);
    });

    it('should throw an error if delete fails', async () => {
      const userId = 1;
      const slug = 'test-article';

      favoriteService.delete.mockRejectedValue(new Error('Delete failed'));

      await expect(controller.delete(userId, slug)).rejects.toThrow(
        'Delete failed',
      );
      expect(favoriteService.delete).toHaveBeenCalledWith(slug, userId);
    });
  });
});
