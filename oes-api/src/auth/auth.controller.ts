import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refresh-token.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginInput) {
    const { accessToken, refreshToken, user } = await this.auth.login(
      email.toLowerCase(),
      password
    );

    return {
      accessToken,
      refreshToken,
      user: {
        ...user,
        password: undefined,
      },
    };
  }

  @Post('refreshToken')
  async refreshToken(@Body() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }
}
