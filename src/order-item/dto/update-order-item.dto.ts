import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order-item.dto';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
    @ApiProperty({ example: 1 })
    orderId: number;
    @ApiProperty({ example: 1 })
    productId: number;
    @ApiProperty({ example: 1 })
    restaurantId: number;
}
