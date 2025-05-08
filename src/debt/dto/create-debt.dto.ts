import { ApiProperty } from "@nestjs/swagger";

export class CreateDebtDto {
    @ApiProperty({example:"12345"})
    sum:number;
    @ApiProperty({example:'Alex'})
    costumer:string;
    @ApiProperty({example:'1'})
    orderId:number;
    @ApiProperty({example:'1'})
    restaurantId:number;
}
