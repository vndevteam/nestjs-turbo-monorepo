import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from '@repo/api/utils/offset-pagination';
import { ArticleEntity, TagEntity } from '@repo/database-typeorm';
import slugify from 'slugify';
import { In, Repository } from 'typeorm';
import { ArticleListReqDto, ArticleListResDto } from './dto/article-list.dto';
import { ArticleDto, ArticleResDto } from './dto/article.dto';
import { CreateArticleReqDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async list(reqDto: ArticleListReqDto): Promise<ArticleListResDto> {
    const qb = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .leftJoinAndSelect('article.tags', 'tags')
      .leftJoinAndSelect('article.favoritedBy', 'favoritedBy');

    qb.where('1 = 1');

    if (reqDto.tag) {
      qb.where('tags.name LIKE :tag', { tag: `%${reqDto.tag}%` });
    }

    if (reqDto.author) {
      qb.andWhere('author.username = :author', { author: reqDto.author });
    }

    if (reqDto.favorited) {
      qb.andWhere('favoritedBy.username = :favorited', {
        favorited: reqDto.favorited,
      });
    }

    qb.orderBy('article.createdAt', 'DESC');

    const [articles, metaDto] = await paginate<ArticleEntity>(qb, reqDto, {
      skipCount: false,
      takeAll: false,
    });

    const articleDtos = articles.map((article) => {
      const articleDto = article.toDto(ArticleDto);
      delete articleDto.body;
      articleDto.tagList = article.tags.map((tag) => tag.name);
      return articleDto;
    });

    return {
      articles: articleDtos,
      articlesCount: metaDto.totalRecords,
      pagination: metaDto,
    };
  }

  async feed() {
    throw new Error('Method not implemented.');
  }

  async get(_slug: string) {
    throw new Error('Method not implemented.');
  }

  async create(
    userId: number,
    articleData: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    const { title, description, body, tagList } = articleData;
    const slug = await this.validateAndCreateSlug(title);
    const { existingTags, newTags } = await this.prepareTags(tagList);

    let savedArticle: ArticleEntity;
    await this.articleRepository.manager.transaction(async (manager) => {
      // Save new tags
      const savedNewTags = await manager.save(newTags);
      const allTags = [...existingTags, ...savedNewTags];

      // Save article
      const newArticle = new ArticleEntity({
        title,
        slug,
        description,
        body,
        authorId: userId,
        tags: allTags,
      });
      savedArticle = await manager.save(newArticle);
    });

    return {
      article: {
        title: savedArticle.title,
        description: savedArticle.description,
        body: savedArticle.body,
        tagList: savedArticle.tags.map((tag) => tag.name),
      },
    };
  }

  async delete(_slug: string) {
    throw new Error('Method not implemented.');
  }

  async update(_slug: string) {
    throw new Error('Method not implemented.');
  }

  private async validateAndCreateSlug(title: string) {
    const slug = slugify(title);
    const existingArticle = await this.articleRepository.findOne({
      where: { slug },
    });

    if (existingArticle) {
      return `${slug}-${Date.now()}`;
    }

    return slug;
  }

  private async prepareTags(tagList: string[]) {
    const existingTags = await this.tagRepository.find({
      where: { name: In(tagList) },
    });

    const existingTagNames = existingTags.map((tag) => tag.name);

    const newTagNames = tagList.filter(
      (tag) => !existingTagNames.includes(tag),
    );
    const newTags = this.tagRepository.create(
      newTagNames.map((name) => ({ name })),
    );

    return { existingTags, newTags };
  }
}
