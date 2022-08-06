import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.PORT || 9000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT, () => {
    console.log(`Server is running on site http://localhost:${PORT}`);
  });
}
bootstrap();
