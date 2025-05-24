import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @ApiProperty({ example: 'Iphone 15', description: 'Mahsulot nomi' })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ example: 999.99, description: 'Narxi' })
  @Column({ type: DataType.FLOAT })
  price: number;


    @Column({ allowNull: true })
  image?: string;

  @ApiProperty({ example: 'Smartphone from Apple', description: 'Mahsulot tavsifi' })
  @Column({ type: DataType.TEXT })
  description: string;
}
