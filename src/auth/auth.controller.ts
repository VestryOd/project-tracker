import { Controller, Post, Body, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PublicUserDto } from './dto/public-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response): Promise<{ user: PublicUserDto }>  {
    const { accessToken, refreshToken, user } = await this.authService.register(dto);
    res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
    return { user };
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<{ user: PublicUserDto }> {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const { accessToken, refreshToken } = await this.authService.login(user);
    console.log('--accessToken', accessToken);
    res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
    return { user };
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<{ success: boolean }> {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) throw new UnauthorizedException('No refresh token');
    const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_SECRET });
    const accessToken = this.jwtService.sign({ sub: payload.sub, email: payload.email }, { secret: process.env.JWT_SECRET, expiresIn: '15m' });
    res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', maxAge: 15 * 60 * 1000 });
    return { success: true };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<{ success: boolean }> {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { success: true };
  }
} 