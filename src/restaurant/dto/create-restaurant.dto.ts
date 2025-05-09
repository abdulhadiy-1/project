import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  regionId: number;

  @ApiProperty()
  adres: string;

  @ApiProperty()
  tip: number;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  tgUserName: string
}
