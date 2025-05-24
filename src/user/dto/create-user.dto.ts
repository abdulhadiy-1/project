import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsPhoneNumber()
  phone: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsNumber()
  regionId: number;
  @ApiProperty({ enum: Role })
  role: Role;
  @ApiProperty()
  @IsNumber()
  restaurantId: number;
}
