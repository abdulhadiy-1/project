import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private client: PrismaService,
    private jwt: JwtService,
  ) {}
  async create(data: CreateUserDto) {
    let user = await this.client.user.findUnique({
      where: { phone: data.phone },
    });
    if (user) throw new BadRequestException('user alredy exists');
    let region = await this.client.region.findUnique({
      where: { id: data.regionId },
    });
    if (!region) throw new NotFoundException('region not found');
    let restaurant = await this.client.restaurant.findUnique({
      where: { id: data.restaurantId },
    });
    if (!restaurant) throw new NotFoundException('drestaurant not found');
    let hash = bcrypt.hashSync(data.password, 10);
    let newUser = await this.client.user.create({
      data: { ...data, password: hash },
    });
    let token = this.jwt.sign({ id: newUser.id, role: newUser.role });
    return {newUser, token};
  }

  async findAll(
    restaurantId: number,
    role: Role,
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
    if (role) {
      where.role = role;
    }
    if (filter) {
      where.name = {
        startWith: filter,
      };
    }
    let users = await this.client.user.findMany({ where, skip, take });
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

  async login(phone: string, password: string) {
    let user = await this.client.user.findUnique({ where: { phone } });
    if (!user) throw new NotFoundException('user not found');
    let match = bcrypt.compareSync(password, user.password);
    if (!match) throw new NotFoundException('wrong password');
    let token = this.jwt.sign({ id: user.id, role: user.role });
    return { token };
  }
}
