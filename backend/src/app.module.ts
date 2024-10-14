import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigHelper } from '@src/shared/helpers/config.heper';
import { LoggerModule } from '@modules/logger/logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [ConfigHelper.getEnvironmentSettings],
    }),
    LoggerModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
