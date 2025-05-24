import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  Min,
  MaxLength,
  MinLength,
  Max,
  IsOptional,
  isNumber,
} from 'class-validator';

export class CreateProductDto {

  @ApiProperty()
  @IsNumber()
  id:number;

  @ApiProperty({ example: 'iPhone 14' })
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @MaxLength(500)
  @MinLength(10)
  description: string;

  @ApiProperty({ example: 10, description: 'Discount percentage from 0 to 100' })
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @ApiProperty({ example: 4.5, description: 'Product rating from 0 to 5' })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 100, description: 'Available stock quantity' })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 1800, description: 'Narxi' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'string' })
  @IsString()
  @MaxLength(100)
  @MinLength(10)
  imge: string;
}
