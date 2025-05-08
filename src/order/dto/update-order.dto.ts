import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({ example: '1' })
    table: string;
    @ApiProperty({ example: '1' })
    restaurantId: number;
}
