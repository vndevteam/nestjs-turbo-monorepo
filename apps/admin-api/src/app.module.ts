import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@repo/api/config/app.config';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
