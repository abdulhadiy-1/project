import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDebtDto {
  @ApiProperty({ example: '12345' })
  @IsNumber()
  @IsNotEmpty()
  sum: number;
  @ApiProperty({ example: 'Alex' })
  @IsString()
  @IsNotEmpty()
  costumer: string;
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;
  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;
}
