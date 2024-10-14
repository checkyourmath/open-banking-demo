import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationHelper } from '@src/shared/helpers/validation.helper';
import { EnvironmentSettings } from '@src/shared/types/environment-settings.type';
import { AppLogger } from '@modules/logger/logger.service';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@shared/exception-filters/http.exception-filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const logger = new AppLogger();
  const configService: ConfigService<EnvironmentSettings> = app.get(ConfigService);
  const port = configService.get('port', { infer: true });
  const environmentName = configService.get('environmentName', { infer: true });

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: ValidationHelper.validationExceptionFactory,
    whitelist: true,
  }));
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.setGlobalPrefix('api');

  process.on('uncaughtException', (err) => {
    logger.fatal(`globalError - {message ${err.message}, stack - ${err.stack}`, err.name);
  });

  const swaggerBuilder = new DocumentBuilder()
    .setTitle('Open Office Demo Backend')
    .setVersion('0.0.1');
  const swaggerConfig = swaggerBuilder.build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, swaggerDocument);

  await app.listen(port);

  logger.debug(`Server is running on port "${port}", environment name "${environmentName}".`);
}

void bootstrap();
