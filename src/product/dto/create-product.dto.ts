import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  categoryId: number;
  @ApiProperty()
  restaurantId: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  isActive: boolean;
}
