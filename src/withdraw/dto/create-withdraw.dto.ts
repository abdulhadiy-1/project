import { ApiProperty } from "@nestjs/swagger";
import { Type } from "@prisma/client";

export class CreateWithdrawDto {
    @ApiProperty({ example: 1})
    orderId: number;
    @ApiProperty({ example: 1})
    restaurantId: number;
    @ApiProperty({ enum:Type})
    type: Type;
    @ApiProperty({ example: 12345})
    sum: number;
}
