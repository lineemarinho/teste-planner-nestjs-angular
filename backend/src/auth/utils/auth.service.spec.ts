import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: jest.Mocked<JwtService>;

  const adminEmail = 'admin@recipehub.com';
  const adminPassword = 'admin123';
  let adminPasswordHash: string;

  beforeAll(async () => {
    adminPasswordHash = await bcrypt.hash(adminPassword, 4);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn().mockResolvedValue('signed-jwt') },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(
              (key: string) =>
                ({
                  ADMIN_EMAIL: adminEmail,
                  ADMIN_PASSWORD_HASH: adminPasswordHash,
                })[key],
            ),
          },
        },
      ],
    }).compile();

    service = module.get(AuthService);
    jwtService = module.get(JwtService);
  });

  it('returns an access token for valid credentials', async () => {
    const result = await service.login({
      email: adminEmail,
      password: adminPassword,
    });

    expect(result).toEqual({ accessToken: 'signed-jwt' });
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: adminEmail,
      email: adminEmail,
    });
  });

  it('rejects an unknown email', async () => {
    await expect(
      service.login({ email: 'nope@recipehub.com', password: adminPassword }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rejects a wrong password', async () => {
    await expect(
      service.login({ email: adminEmail, password: 'wrong-password' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
