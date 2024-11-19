import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@repo/database-typeorm';
import { UserFollowsEntity } from '@repo/database-typeorm/entities/user-follows.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserFollowsEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
