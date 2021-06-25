import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors(); // cors 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 구조에 맞지 않는 데이터 요청 시 에러 처리
    forbidNonWhitelisted: true, // 구조에 맞지 않는 데이터를 요청하면 애초에 잘라버림
    transform: true // 클라에서 받은 데이터를 우리가 원하는 타입으로 바꿔줌
  }))
  await app.listen(3000);
}
bootstrap();
