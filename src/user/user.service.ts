import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private client: PrismaService) {}
  async create(data: CreateUserDto) {
    let region = await this.client.region.findUnique({
      where: { id: data.regionId },
    });
    if (!region) throw new NotFoundException('region not found');
    let restaurant = await this.client.restaurant.findUnique({
      where: { id: data.restaurantId },
    });
    if (!restaurant) throw new NotFoundException('restaurant not found');
    let user = await this.client.user.create({ data });
    return user;
  }

  async findAll() {
    let users = await this.client.user.findMany();
    return users;
  }

  async findOne(id: number) {
    let user = await this.client.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    let user = await this.client.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('user not found');
    let updated = await this.client.user.update({ where: { id }, data });
    return updated;
  }

  async remove(id: number) {
    let user = await this.client.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('user not found');
    let deleted = await this.client.user.delete({ where: { id } });
    return deleted;
  }
}
