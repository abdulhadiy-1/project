import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthRole } from '../enum/auth-role.enum';


export class LoginAuthDto {
  @IsEmail()
  @ApiProperty({ example: 'ahmadjon@gmail.com' })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @ApiProperty({ example: 'strongPass5462' })
  password: string;

  @ApiProperty({enum:AuthRole})
  @IsString()
  role: string;

  }

