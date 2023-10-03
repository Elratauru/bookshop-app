import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = 4000;

async function init() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  console.log('App will be set to run at localhost:' + PORT );
  app.enableCors();
  await app.listen(PORT);
}

init();
