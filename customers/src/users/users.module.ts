import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from '../shared/entities/users/user.entity';

import { RMQ_PROXY_CONFIG } from 'src/services/config/config-service';

const serviceClients = [RMQ_PROXY_CONFIG.MAILER_SERVICE];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([...serviceClients]),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
