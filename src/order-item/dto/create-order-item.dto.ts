import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderItemDto {
    @ApiProperty({example: 1})
    orderId:number;
    @ApiProperty({example: 1})
    productId:number;
    @ApiProperty({example: 1})
    restaurantId:number;
    
}
