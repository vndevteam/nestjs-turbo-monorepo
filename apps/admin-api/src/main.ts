import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AllConfigType } from './config/config.type';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  const configService = app.get(ConfigService<AllConfigType>);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));

  console.info(`Server running on ${await app.getUrl()}`);
}
bootstrap();
