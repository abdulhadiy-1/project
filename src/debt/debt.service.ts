import { Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DebtService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateDebtDto) {
    try {
      let debt = await this.prisma.debt.create({ data })
      await this.prisma.order.update({ where: { id: data.orderId }, data: { status: "DEBT" } })
      return debt;
    } catch (error) {
      throw new Error(`Creating error! ${error.message}`)
    }
  }

  async findAll(restaurantId: number, page: number, limit: number) {

    let where: any = {}
    if (restaurantId) {
      where.restaurantId = restaurantId
    }
    const skip = (page - 1) * limit;

    const debts = await this.prisma.debt.findMany({
      where,
      skip,
      take: limit,
      include: {
        order: true,
      },
    });

    return debts;

  }




  async findOne(id: number) {
    try {
      let one = await this.prisma.debt.findFirst({ where: { id } })
      return one;
    } catch (error) {
      throw new Error(`findOne error ${error.message}`)
    }
  }

  async update(id: number, data: UpdateDebtDto) {
    try {
      const { orderId, restaurantId, ...rest } = data;

      const updateData: any = {
        ...rest,
      };

      if (orderId) {
        updateData.order = {
          connect: { id: orderId },
        };
      }

      if (restaurantId) {
        updateData.restaurant = {
          connect: { id: restaurantId },
        };
      }

      const updated = await this.prisma.debt.update({
        where: { id },
        data: updateData,
      });

      return updated;
    } catch (error) {
      throw new Error(`update error! ${error.message}`);
    }
  }


  async remove(id: number) {
    try {
      let deleted = await this.prisma.debt.delete({ where: { id } })
      return (`Debt deleted ${deleted.id}`)
    } catch (error) {
      throw new Error(`delete error ${error.message}`)
    }
  }
}
