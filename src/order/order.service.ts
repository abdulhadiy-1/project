import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramService } from 'src/tg/tg.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tgService: TelegramService,
  ) {}

  async create(data: CreateOrderDto) {
    const { table, restaurantId, products } = data;

    let total = 0;

    for (let e of products) {
      const prd = await this.prisma.product.findUnique({
        where: { id: e.productId },
      });
      if (!prd)
        throw new NotFoundException(
          `product with #${e.productId} id not found`,
        );

      total += prd.price * e.count;
    }

    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant)
      throw new NotFoundException(
        `restaurant with #${restaurantId} id not found`,
      );

    const order = await this.prisma.order.create({
      data: {
        table,
        restaurant: { connect: { id: restaurantId } },
        total,
        status: 'PANDING',
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
    const productNames =
      'New order:\n\n' +
      order.items
        .map((item) => `food: ${item.product.name}, count:${item.count}`)
        .join(',\n') +
      `\n\ntotal: ${total}sum`;
    if (restaurant.tgUserName) {
      try {
        this.tgService.sendMessageByUsername(
          productNames,
          restaurant.tgUserName,
        );
      } catch (error) {
        console.log(error);
      }
    }

    return order;
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const orders = await this.prisma.order.findMany({
      skip,
      take: 20,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        Withdraw: true,
        Debt: true,
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
      const { products, ...rest } = data;

      let total = 0;

      if (products) {
        for (let e of products) {
          const prd = await this.prisma.product.findUnique({
            where: { id: e.productId },
          });
          if (!prd)
            throw new NotFoundException(
              `product with #${e.productId} id not found`,
            );

          total += prd.price * e.count;
        }
      }

      const updateData: any = {
        ...rest,
      };

      if (products) {
        updateData.total = total;
        updateData.items = {
          deleteMany: {},
          create: products.map((item) => ({
            product: { connect: { id: item.productId } },
            count: item.count,
          })),
        };
      }

      const updated = await this.prisma.order.update({
        where: { id },
        data: updateData,
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      return updated;
    } catch (error) {
      throw new Error(`update error! ${error.message}`);
    }
  }


  async remove(id: number) {
    try {
      await this.prisma.orderItem.deleteMany({
        where: { orderId: id },
      });
  
      const removed = await this.prisma.order.delete({
        where: { id },
      });
  
      return removed;
    } catch (error) {
      throw new Error(`remove error! ${error.message}`);
    }
  }
  
}

