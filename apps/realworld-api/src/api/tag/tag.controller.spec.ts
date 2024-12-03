import { Test, TestingModule } from '@nestjs/testing';
import { TagListResDto } from './dto/tag-list.dto';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

describe('TagController', () => {
  let controller: TagController;
  let tagService: Partial<Record<keyof TagService, jest.Mock>>;

  beforeAll(async () => {
    tagService = {
      list: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: tagService,
        },
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
  });

  describe('list', () => {
    it('should return a list of tags', async () => {
      const mockTags: TagListResDto = {
        tags: ['nestjs', 'typescript', 'jest'],
      };

      tagService.list.mockResolvedValue(mockTags);

      const result = await controller.list();

      expect(result).toEqual(mockTags);
      expect(tagService.list).toHaveBeenCalled();
    });

    it('should throw an error if list fails', async () => {
      tagService.list.mockRejectedValue(new Error('List failed'));

      await expect(controller.list()).rejects.toThrow('List failed');
      expect(tagService.list).toHaveBeenCalled();
    });
  });
});
