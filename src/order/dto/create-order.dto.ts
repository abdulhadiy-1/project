import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: '1', description: 'table number' })
  @IsString()
  @IsNotEmpty()
  table: string;

  @ApiProperty({ example: 1, description: 'restaurant ID' })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({
    example: [{ productId: 1, count: 2 }],
    type: [Object],
  })
  products: { productId: number; count: number }[];
}
