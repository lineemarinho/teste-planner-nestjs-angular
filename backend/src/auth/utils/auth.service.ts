import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPasswordHash = this.configService.get<string>(
      'ADMIN_PASSWORD_HASH',
    );

    const isEmailValid = dto.email === adminEmail;
    const isPasswordValid =
      isEmailValid &&
      (await bcrypt.compare(dto.password, adminPasswordHash ?? ''));

    if (!isEmailValid || !isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: dto.email,
      email: dto.email,
    });

    return { accessToken };
  }
}
