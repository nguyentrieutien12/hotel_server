import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import path, { join } from 'path';
import { AppModule } from './app.module';
const PORT = process.env.PORT || 9000;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/image/' });
  app.listen(PORT, () => {
    console.log(`Server is running on site http://localhost:${PORT}`);
  });
}
bootstrap();
