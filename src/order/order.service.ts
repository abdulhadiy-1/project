import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    const { table, restaurantId, products } = data;
    for(let e of products){
      let prd = await this.prisma.product.findUnique({where: {id: e.productId}})
      if(!prd) throw new NotFoundException(`product with #${e.productId} id not found`)
    }
    let restaurant = await this.prisma.restaurant.findUnique({where: {id: restaurantId}})
    if(!restaurant) throw new NotFoundException(`restaurant with #${restaurant} id not found`)
    const order = await this.prisma.order.create({
      data: {
        table,
        restaurant: { connect: { id: restaurantId } },
        items: {
          create: products.map((item) => ({
            product: { connect: { id: item.productId } },
            count: item.count,
          })),
        },
      },
      include: {
        items: {
          include: { product: true }, 
        },
      },
    });

    return order;
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const orders = await this.prisma.order.findMany({
      skip,
      take: limit,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        Withdraw: true,
        Debt: true,
        user: true,
      },
    });

    return orders;
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.order.findFirst({
        where: { id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          Withdraw: true,
          Debt: true,
          user: true,
        },
      });
      return one;
    } catch (error) {
      throw new Error(`findOne error! ${error.message}`);
    }
  }

  async update(id: number, data: UpdateOrderDto) {
    try {
      let updated = await this.prisma.order.update({ where: { id }, data });
      return updated;
    } catch (error) {
      throw new Error(`update error! ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      let removed = await this.prisma.order.delete({ where: { id } });
      return removed;
    } catch (error) {
      throw new Error(`remove error! ${error.message}`);
    }
  }
}
