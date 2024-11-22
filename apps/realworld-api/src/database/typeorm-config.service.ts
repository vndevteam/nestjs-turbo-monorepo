import { AllConfigType } from '@/config/config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmCustomLogger } from '@repo/mysql-typeorm';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const modulePath = require.resolve('@repo/database-typeorm');
    const nodeModulesDir = join(modulePath, '..', '..');

    return {
      type: this.configService.get('database.type', { infer: true }),
      host: this.configService.get('database.host', { infer: true }),
      port: this.configService.get('database.port', { infer: true }),
      username: this.configService.get('database.username', { infer: true }),
      password: this.configService.get('database.password', { infer: true }),
      database: this.configService.get('database.name', { infer: true }),
      synchronize: this.configService.get('database.synchronize', {
        infer: true,
      }),
      dropSchema: false,
      keepConnectionAlive: true,
      // Only use logging or logger
      // logging: this.configService.get('database.logging', { infer: true }),
      logger: TypeOrmCustomLogger.getInstance(
        'default',
        this.configService.get('database.logging', { infer: true })
          ? ['error', 'warn', 'query', 'schema']
          : ['error', 'warn'],
      ),
      entities: [join(nodeModulesDir, 'dist', '**', '*.entity.{ts,js}')],
      poolSize: this.configService.get('database.maxConnections', {
        infer: true,
      }),
      ssl: this.configService.get('database.sslEnabled', { infer: true })
        ? {
            rejectUnauthorized: this.configService.get(
              'database.rejectUnauthorized',
              { infer: true },
            ),
            ca:
              this.configService.get('database.ca', { infer: true }) ??
              undefined,
            key:
              this.configService.get('database.key', { infer: true }) ??
              undefined,
            cert:
              this.configService.get('database.cert', { infer: true }) ??
              undefined,
          }
        : undefined,
    } as unknown as TypeOrmModuleOptions;
  }
}
