import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDebtDto } from './create-debt.dto';

export class UpdateDebtDto extends PartialType(CreateDebtDto) {
    @ApiProperty({ example: "12345" })
    sum?: number;
    @ApiProperty({ example: 'Alex' })
    customer?: string;
    @ApiProperty({ example: '1' })
    orderId?: number;
    @ApiProperty({ example: '1' })
    restaurantId?: number;
}
