import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({example:'1'})
    table: string;
    @ApiProperty({example:'1'})
    restaurantId: number;
}
