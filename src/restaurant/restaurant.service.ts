import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private client: PrismaService) {}
  async create(data: CreateRestaurantDto) {
    let region = await this.client.region.findUnique({
      where: { id: data.regionId },
    });
    if (!region) throw new NotFoundException('region not found');
    let restaurant = await this.client.restaurant.create({ data });
    return restaurant;
  }

  async findAll(filter: string, page: number, limit: number) {
    let take = limit || 10;
    let skip = page ? (page - 1) * take : 0;
    let where: any = {};
    if (filter) {
      where.name = {
        startWith: filter,
      };
    }
    let restaurants = await this.client.restaurant.findMany({
      where,
      skip,
      take,
    });
    return restaurants;
  }

  async findOne(id: number) {
    let restaurant = await this.client.restaurant.findUnique({ where: { id } });
    if (!restaurant) throw new NotFoundException('restaurant not found');
    return restaurant;
  }

  async update(id: number, data: UpdateRestaurantDto) {
    let restaurant = await this.client.restaurant.findUnique({ where: { id } });
    if (!restaurant) throw new NotFoundException('restaurant not found');
    let updated = await this.client.restaurant.update({ where: { id }, data });
    return updated;
  }

  async remove(id: number) {
    let restaurant = await this.client.restaurant.findUnique({ where: { id } });
    if (!restaurant) throw new NotFoundException('restaurant not found');
    let deleted = await this.client.restaurant.delete({ where: { id } });
    return deleted;
  }
}
