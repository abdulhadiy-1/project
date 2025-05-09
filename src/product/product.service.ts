import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private client: PrismaService) {}
  async create(data: CreateProductDto) {
    let restaurant = await this.client.restaurant.findUnique({
      where: { id: data.restaurantId },
    });
    if (!restaurant) throw new NotFoundException('restaurant not found');
    let category = await this.client.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) throw new NotFoundException('category not found');
    let prd = await this.client.product.create({ data });
    return prd;
  }

  async findAll(
    restaurantId: number,
    filter: string,
    page: number,
    limit: number,
    categoryId: number,
  ) {
    let take = limit || 10;
    let skip = page ? (page - 1) * take : 0;
    let where: any = {};
    if (restaurantId) {
      where.restaurantId = restaurantId;
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (filter) {
      where.name = {
        startWith: filter,
      };
    }

    let prd = await this.client.product.findMany({ where, skip, take });
    return prd;
  }

  async findOne(id: number) {
    let prd = await this.client.product.findUnique({ where: { id } });
    if (!prd) throw new NotFoundException('product not found');
    return prd;
  }

  async update(id: number, data: UpdateProductDto) {
    let prd = await this.client.product.findUnique({ where: { id } });
    if (!prd) throw new NotFoundException('product not found');
    let updated = await this.client.product.update({ where: { id }, data });
    return updated;
  }

  async remove(id: number) {
    let prd = await this.client.product.findUnique({ where: { id } });
    if (!prd) throw new NotFoundException('product not found');
    let deleted = await this.client.product.delete({ where: { id } });
    return deleted;
  }
}
