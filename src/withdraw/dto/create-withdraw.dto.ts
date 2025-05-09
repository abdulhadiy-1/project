import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class CreateWithdrawDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  orderId: number;
  @ApiProperty({ example: 1 })
  @IsNumber()
  restaurantId: number;
  @ApiProperty({ enum: Type })
  type: Type;
  @ApiProperty({ example: 12345 })
  @IsNumber()
  sum: number;
}
