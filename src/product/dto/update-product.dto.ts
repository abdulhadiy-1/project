<<<<<<< HEAD
import { PartialType } from '@nestjs/mapped-types';
=======
import { PartialType } from '@nestjs/swagger';
>>>>>>> 5e9747d52eda172d0aa1d8646a3f9f542e77c33d
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
