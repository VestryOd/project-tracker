import { Controller, Get, Put, Delete, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { Request } from 'express'; 
import { PublicUserDto } from 'src/auth/dto/public-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@GetUser() user: { sub: string }): Promise<PublicUserDto>  {
    if (!user) throw new UnauthorizedException();
    const foundUser = await this.usersService.findById(user.sub);
    if (!foundUser) throw new UnauthorizedException('User not found');
    return {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateMe(@GetUser() user: { sub: string }, @Body() dto: UpdateUserDto): Promise<PublicUserDto> {
    if (!user) throw new UnauthorizedException();
    const updatedUser = await this.usersService.update(user.sub, dto);
    if (!updatedUser) throw new UnauthorizedException('User not found');
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteMe(@GetUser() user: { sub: string }): Promise<{ success: boolean }> {
    if (!user) throw new UnauthorizedException();
    await this.usersService.remove(user.sub);
    return { success: true };
  }
} 