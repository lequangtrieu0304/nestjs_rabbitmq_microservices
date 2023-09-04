import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TokenEntity } from 'src/shared/entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { IToken } from './interfaces/token.interface';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  public async createToken(userId: number): Promise<IToken> {
    const token = this.jwtService.sign(
      { userId },
      { secret: process.env.TOKEN_ACCESS_SECRET },
    );
    const newTokenEntity = this.tokenRepository.create({ userId, token });
    const result: IToken = await this.tokenRepository.save(newTokenEntity);
    return result;
  }

  public async decode(token: string) {
    const authToken = token.split(' ')[1];
    const tokenExist = await this.tokenRepository.findOne({
      where: { token: authToken },
    });
    if (!tokenExist) return;

    const userInfo = this.jwtService.verify(authToken, {
      secret: process.env.TOKEN_ACCESS_SECRET,
    }) as { userId: number };
    return userInfo;
  }

  public async destroyToken(userId: number) {
    const userToken = await this.tokenRepository.findOne({ where: { userId } });
    if (!userToken) throw new NotFoundException('INVALID_TOKEN');
    return await this.tokenRepository.remove(userToken);
  }
}
