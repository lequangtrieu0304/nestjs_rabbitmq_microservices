import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>('secured', context.getHandler());
    if (!secured) return true;

    const request = context.switchToHttp().getRequest();
    const userTokenInfo = await firstValueFrom(
      this.tokenServiceClient.send('token_decode', {
        token: request.headers.authorization,
      }),
    );
    if (userTokenInfo.status !== HttpStatus.OK) return;

    const userInfo = await firstValueFrom(
      this.userServiceClient.send('user_get_by_id', userTokenInfo.data.userId),
    );
    request.user = userInfo.user;
    return true;
  }
}
