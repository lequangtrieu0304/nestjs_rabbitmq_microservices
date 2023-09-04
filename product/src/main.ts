import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { config } from 'dotenv';

import { Logger } from '@nestjs/common';
const logger = new Logger();

async function bootstrap() {
  config();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URI],
        queue: process.env.RMQ_PRODUCT_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
  logger.log('----------------------------------');
  logger.log('Microservice Product is listening');
}
bootstrap();
