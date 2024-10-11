import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const swaggerBuilder = new DocumentBuilder()
    .setTitle('Open Office Demo Backend')
    .setVersion('0.0.1');
  const swaggerConfig = swaggerBuilder.build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, swaggerDocument);

  await app.listen(3000);
}

void bootstrap();
