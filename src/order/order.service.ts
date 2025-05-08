import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateOrderDto) {
    try {
      let order = await this.prisma.order.create({ data })
      return order;
    } catch (error) {
      throw new Error(`Creating error! ${error.message}`)
    }
  }

  async findAll() {
    try {
      let orders = await this.prisma.order.findMany({
        include: {
          product: true,
          Withdraw: true,
          Debt: true,
          user: true,
        }
      })
      return orders;
    } catch (error) {
      throw new Error(`findAll error! ${error.message}`)
    }
  }


  async findOne(id: number) {
    try {
      let one = await this.prisma.order.findFirst({ where: { id } })
      return one;
    } catch (error) {
      throw new Error(`findOne error! ${error.message}`)
    }
  }


  async update(id: number, data: UpdateOrderDto) {
    try {
      let updated = await this.prisma.order.update({ where: { id }, data })
      return updated
    } catch (error) {
      throw new Error(`update error! ${error.message}`)
    }
  }

  async remove(id: number) {
    try {
      let removed = await this.prisma.order.delete({ where: { id } })
      return removed;
    } catch (error) {
      throw new Error(`remove error! ${error.message}`)
    }

  }
}
