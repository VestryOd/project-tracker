import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'some@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'User password' })
  password: string;
} 