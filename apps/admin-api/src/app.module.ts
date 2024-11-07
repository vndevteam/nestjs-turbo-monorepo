import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from '@repo/api';
import { databaseConfig } from '@repo/database-typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ApiModule } from './api/api.module';
import authConfig from './api/auth/config/auth.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './database/typeorm-config.service';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [appConfig, databaseConfig, authConfig],
  envFilePath: ['.env'],
});

const dbModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    if (!options) {
      throw new Error('Invalid options passed');
    }

    return new DataSource(options).initialize();
  },
});

@Module({
  imports: [configModule, dbModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
