import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWithdrawDto } from './create-withdraw.dto';
import { Type } from '@prisma/client';

export class UpdateWithdrawDto extends PartialType(CreateWithdrawDto) {
    @ApiProperty({ example: 1 })
    orderId: number;
    @ApiProperty({ example: 1 })
    restaurantId: number;
    @ApiProperty({enum:Type})
    type: Type;
    @ApiProperty({ example: 12345 })
    sum: number;
}
