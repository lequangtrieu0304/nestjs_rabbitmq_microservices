import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
config();

export const generateRMQ = (name: string, queue: string): ClientProviderOptions => ({
  name,
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RMQ_URI],
    queue,
    queueOptions: {
      durable: false,
    },
  },
});

export const RMQ_PROXY_CONFIG = {
  USER_SERVICE: generateRMQ('USER_SERVICE', process.env.RMQ_USER_QUEUE),
  TOKEN_SERVICE: generateRMQ('TOKEN_SERVICE', process.env.RMQ_TOKEN_QUEUE),
  PRODUCT_SERVICE: generateRMQ('PRODUCT_SERVICE', process.env.RMQ_PRODUCT_QUEUE),
};
