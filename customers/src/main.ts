import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

import { AppModule } from './app.module';
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
        queue: process.env.RMQ_USER_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
  logger.log('----------------------------------');
  logger.log('Microservice Customer is listening');
}
bootstrap();
