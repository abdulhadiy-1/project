import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
