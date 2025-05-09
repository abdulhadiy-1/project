import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: '1', description: 'table number' })
  table: string;

  @ApiProperty({ example: 1, description: 'restaurant ID' })
  restaurantId: number;

  @ApiProperty({
    example: [{ productId: 1, count: 2 }],
    type: [Object],
  })
  products: { productId: number; count: number }[];
}
