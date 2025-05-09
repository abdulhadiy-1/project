import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WithdrawService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateWithdrawDto) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: data.restaurantId },
    });
    if (!restaurant)
      throw new NotFoundException(
        `Restaurant with ID ${data.restaurantId} not found`,
      );
    const currentSum = restaurant.sum ?? 0;
    if (data.type === 'INCOME') {
      const order = await this.prisma.order.findUnique({
        where: { id: data.orderId },
      });
      if (!order) throw new NotFoundException('Order not found');

      const orderTotal = order.total ?? 0;
      let userId = order.userId ? order.userId : 1
      let tip = (orderTotal / 100) * restaurant.tip
      await this.prisma.user.update({ where: { id: userId }, data: { balance: tip } })
      await this.prisma.order.update({ where: { id: data.orderId }, data: { status: "PAID" } })
      await this.prisma.restaurant.update({
        where: { id: data.restaurantId },
        data: { sum: currentSum + orderTotal },
      });
    } else {
      if (currentSum < data.sum)
        throw new BadRequestException(`restaurant do not have ${data.sum}sum`);
      await this.prisma.restaurant.update({
        where: { id: data.restaurantId },
        data: { sum: currentSum - data.sum },
      });
    }

    const withdraw = await this.prisma.withdraw.create({
      data,
    });

    return withdraw;
  }

  async findAll(restaurantId: number, page: number, limit: number) {
    page = Number(page);
    limit = Number(limit);
    let where: any = {};
    if (restaurantId) {
      where.restaurantId = restaurantId
    }
    const skip = (page - 1) * limit;
    let withdraws = await this.prisma.withdraw.findMany({
      where,
      skip,
      take: limit,
      include: {
        order: true,
      },
    });
    return withdraws;
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.withdraw.findFirst({ where: { id } });
      return one;
    } catch (error) {
      throw new error(`findOne error ${error.message}`);
    }
  }

  async update(id: number, data: UpdateWithdrawDto) {
    try {
      let updated = await this.prisma.withdraw.update({ where: { id }, data });
      return updated;
    } catch (error) {
      throw new error(`update error ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      let deleted = await this.prisma.withdraw.delete({ where: { id } });
      return deleted;
    } catch (error) {
      throw new error(`remove error ${error.message}`);
    }
  }
}
