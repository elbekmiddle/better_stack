import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from 'src/common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.API_PREFIX || 'api/v1');
  app.enableCors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173'});
  app.useGlobalFilters(new GlobalExceptionFilter())
  
  await app.listen(process.env.PORT ?? 3000);

  console.log(process.env.NODE_ENV === 'development' ? `✅ Server is running on http://localhost:${process.env.PORT ?? 3000}` : `✅ Server is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
