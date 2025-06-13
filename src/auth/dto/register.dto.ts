import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John Dou', description: 'User name' })
  name: string;

  @ApiProperty({ example: 'g.dou@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  password: string;
} 