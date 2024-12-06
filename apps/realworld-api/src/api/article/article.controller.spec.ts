import { validateDto } from '@/utils/unit-test.util';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleListReqDto, ArticleListResDto } from './dto/article-list.dto';

describe('ArticleController', () => {
  let controller: ArticleController;
  let articleService: Partial<Record<keyof ArticleService, jest.Mock>>;

  beforeEach(async () => {
    articleService = {
      list: jest.fn(),
      getFeed: jest.fn(),
      get: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: articleService,
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  describe('list', () => {
    it('should return a list of articles', async () => {
      const userId = 1;
      const reqDto: ArticleListReqDto = {
        tag: 'nestjs',
        author: 'testuser',
        favorited: 'testuser',
        limit: 10,
        offset: 0,
      };
      const mockArticles: ArticleListResDto = {
        articles: [
          {
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
        ],
        articlesCount: 1,
        pagination: {
          limit: 10,
          offset: 0,
          totalPages: 1,
          totalRecords: 1,
        },
      };

      articleService.list.mockResolvedValue(mockArticles);

      const result = await controller.list(userId, reqDto);

      expect(result).toEqual(mockArticles);
      expect(articleService.list).toHaveBeenCalled();
    });

    it('should throw an error if list fails', async () => {
      const reqDto: ArticleListReqDto = {
        tag: 'nestjs',
        author: 'testuser',
        favorited: 'testuser',
        limit: 10,
        offset: 0,
      };

      articleService.list.mockRejectedValue(new Error('List failed'));

      await expect(controller.list(1, reqDto)).rejects.toThrow('List failed');
      expect(articleService.list).toHaveBeenCalled();
    });

    describe('ArticleListReqDto', () => {
      it('should validate successfully with valid data', async () => {
        const validData = {
          tag: 'nestjs',
          author: 'testuser',
          favorited: 'testuser',
          limit: 10,
          offset: 0,
        };

        const dto = plainToInstance(ArticleListReqDto, validData);
        const errors = await validateDto(dto);

        expect(errors.length).toBe(0);
      });

      it('should fail validation if limit is negative', async () => {
        const invalidData: ArticleListReqDto = {
          tag: 'nestjs',
          author: 'testuser',
          favorited: 'testuser',
          limit: -10,
          offset: 0,
        };

        const dto = plainToInstance(ArticleListReqDto, invalidData);
        const errors = await validateDto(dto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('limit');
      });

      it('should fail validation if offset is negative', async () => {
        const invalidData = {
          tag: 'nestjs',
          author: 'testuser',
          favorited: 'testuser',
          limit: 10,
          offset: -1,
        };

        const dto = plainToInstance(ArticleListReqDto, invalidData);
        const errors = await validate(dto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('offset');
      });
    });
  });
});
