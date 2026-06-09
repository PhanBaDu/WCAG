import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global Validation with i18n support
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('Cổng Thông Tin Việc Làm NKT API')
    .setDescription('API documentation for the Job Portal for PwD')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: await app.getUrl()`);
}
bootstrap();
