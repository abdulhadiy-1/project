import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateOrderItemDto) {
    try {
      let orderItem = await this.prisma.order.create({
        data: {
          table: "orderItem",
          restaurant: {
            connect: {
              id: data.restaurantId
            }
          }
        }
      })
      return orderItem
    } catch (error) {
      throw new Error(`Creating Error ${error.message}`)
    }
  }

  async findAll() {
    try {
      let orderItems = await this.prisma.order.findMany({
        where: {
          table: "orderItem"
        }
      })
      return orderItems
    } catch (error) {
      throw new Error(`findAll Error ${error.message}`)
    }

  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.order.findFirst({
        where: {
          id: id,
        }
      })
      return one
    } catch (error) {
      throw new Error(`findOne Error ${error.message}`)
    }

  }

  async update(id: number, data: UpdateOrderItemDto) {
    try {
      let orderItem = await this.prisma.order.update({
        where: {
          id: id
        },
        data: {
          restaurant: {
            connect: {
              id: data.restaurantId
            }
          }
        }
      })
      return orderItem
    } catch (error) {
      throw new Error(`Update Error ${error.message}`)
    }
  }

  async remove(id: number) {
    try {
      let deleted = await this.prisma.order.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new Error(`Delete Error ${error.message}`)
    }
  }
}
