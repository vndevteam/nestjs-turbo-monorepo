import { validateDto } from '@/utils/unit-test.util';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentListResDto } from './dto/comment-list.dto';
import { CommentResDto } from './dto/comment.dto';
import { CreateCommentReqDto } from './dto/create-comment.dto';

describe('CommentController', () => {
  let controller: CommentController;
  let commentService: Partial<Record<keyof CommentService, jest.Mock>>;

  beforeAll(async () => {
    commentService = {
      create: jest.fn(),
      list: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: commentService,
        },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  describe('create', () => {
    it('should create a new comment and return the comment data', async () => {
      const userId = 1;
      const slug = 'test-article';
      const commentData: CreateCommentReqDto = {
        body: 'Test Comment',
      };
      const mockComment: CommentResDto = {
        comment: {
          id: 1,
          body: 'Test Comment',
          createdAt: new Date(),
          updatedAt: new Date(),
          author: {
            username: 'testuser',
            bio: 'test bio',
            image: 'http://example.com/image.jpg',
            following: false,
          },
        },
      };

      commentService.create.mockResolvedValue(mockComment);

      const result = await controller.create(slug, commentData, userId);

      expect(result).toEqual(mockComment);
      expect(commentService.create).toHaveBeenCalledWith(
        slug,
        commentData,
        userId,
      );
    });

    it('should throw an error if create fails', async () => {
      const userId = 1;
      const slug = 'test-article';
      const commentData: CreateCommentReqDto = {
        body: 'Test Comment',
      };

      commentService.create.mockRejectedValue(new Error('Create failed'));

      await expect(
        controller.create(slug, commentData, userId),
      ).rejects.toThrow('Create failed');
      expect(commentService.create).toHaveBeenCalledWith(
        slug,
        commentData,
        userId,
      );
    });

    describe('CreateCommentReqDto', () => {
      it('should validate a valid DTO', async () => {
        const dto = plainToInstance(CreateCommentReqDto, {
          body: 'Test Comment',
        });

        const errors = await validateDto(dto);
        expect(errors.length).toBe(0);
      });

      it('should fail validation if body is missing', async () => {
        const dto = plainToInstance(CreateCommentReqDto, {});

        const errors = await validateDto(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('body');
      });

      it('should fail validation if body is empty', async () => {
        const dto = plainToInstance(CreateCommentReqDto, {
          body: '',
        });

        const errors = await validateDto(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('body');
      });
    });
  });

  describe('list', () => {
    it('should return a list of comments', async () => {
      const slug = 'test-article';
      const mockComments: CommentListResDto = {
        comments: [
          {
            id: 1,
            body: 'Test Comment',
            createdAt: new Date(),
            updatedAt: new Date(),
            author: {
              username: 'testuser',
              bio: 'test bio',
              image: 'http://example.com/image.jpg',
              following: false,
            },
          },
        ],
      };

      commentService.list.mockResolvedValue(mockComments);

      const result = await controller.list(slug);

      expect(result).toEqual(mockComments);
      expect(commentService.list).toHaveBeenCalledWith(slug);
    });

    it('should throw an error if list fails', async () => {
      const slug = 'test-article';

      commentService.list.mockRejectedValue(new Error('List failed'));

      await expect(controller.list(slug)).rejects.toThrow('List failed');
      expect(commentService.list).toHaveBeenCalledWith(slug);
    });
  });

  describe('delete', () => {
    it('should delete a comment and return success', async () => {
      const userId = 1;
      const commentId = 1;
      const mockResponse = { success: true };

      commentService.delete.mockResolvedValue(mockResponse);

      const result = await controller.delete(commentId, userId);

      expect(result).toEqual(mockResponse);
      expect(commentService.delete).toHaveBeenCalledWith(commentId, userId);
    });

    it('should throw an error if delete fails', async () => {
      const userId = 1;
      const commentId = 1;

      commentService.delete.mockRejectedValue(new Error('Delete failed'));

      await expect(controller.delete(commentId, userId)).rejects.toThrow(
        'Delete failed',
      );
      expect(commentService.delete).toHaveBeenCalledWith(commentId, userId);
    });
  });
});
