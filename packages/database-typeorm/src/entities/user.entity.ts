import { hashPassword as hashPass } from '@repo/common';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ArticleEntity } from './article.entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_user_id' })
  id!: number;

  @Column()
  @Index('UQ_user_username', ['username'], { unique: true })
  username!: string;

  @Column()
  @Index('UQ_user_email', ['email'], { unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: '' })
  image!: string;

  @Column({ default: '' })
  bio!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hashPass(this.password);
    }
  }

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: Relation<ArticleEntity[]>;

  @ManyToMany(() => ArticleEntity)
  @JoinTable({
    name: 'user_favorites',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_user_favorites_user',
    },
    inverseJoinColumn: {
      name: 'article_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_user_favorites_article',
    },
  })
  favorites: Relation<ArticleEntity[]>;

  @ManyToMany(() => UserEntity, (user) => user.followers)
  @JoinTable({
    name: 'user_follows',
    joinColumn: {
      name: 'follower_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_user_follows_follower',
    },
    inverseJoinColumn: {
      name: 'following_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_user_follows_following',
    },
  })
  following: Relation<UserEntity[]>;

  @ManyToMany(() => UserEntity, (user) => user.following)
  followers: Relation<UserEntity[]>;
}
