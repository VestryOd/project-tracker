import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Dou', description: 'User name' })
  name?: string;

  @ApiProperty({ example: 'example@example.com', description: 'User email' })
  email?: string;

  @ApiProperty({ example: 'pass123', description: 'User password' })
  password?: string;
} 