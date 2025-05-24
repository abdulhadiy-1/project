import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private client: PrismaService) {}
  async create(data: CreateCategoryDto) {
    let restaurant = await this.client.restaurant.findUnique({
      where: { id: data.restaurantId },
    });
    if (!restaurant) throw new NotFoundException('restaurant not found');
    let category = await this.client.category.create({
      data,
    });
    return category;
  }


  async findAll(
    restaurantId: number,
    filter: string,
    page: number,
    limit: number,
  ) {
    let take = limit || 10;
    let skip = page ? (page - 1) * take : 0;
    let where: any = {};
    if (restaurantId) {
      where.restaurantId = restaurantId;
    }
    if (filter) {
      where.name = {
        startWith: filter,
      };
    }
    let categories = await this.client.category.findMany({where, skip, take});
    return categories;
  }

  async findOne(id: number) {
    let category = await this.client.category.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException('category not found');
    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    let category = await this.client.category.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException('category not found');
    let updated = await this.client.category.update({ where: { id }, data });
    return updated;
  }

  async remove(id: number) {
    let category = await this.client.category.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException('category not found');
    let deleted = await this.client.category.delete({ where: { id } });
    return deleted;
  }
}
