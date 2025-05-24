<<<<<<< HEAD
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.modules';
import { CreateProductDto } from './dto/create-product.dto';
import { Op } from 'sequelize';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { FsHelper } from 'src/helpers';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productRepo: typeof Product, 
    private fsHelper: FsHelper,

) {}

  async create(dto: CreateProductDto) {
    return this.productRepo.create(dto as any);
  }

  async findAll(query: any) {
    const {
      search = '',
      sort = 'price',
      order = 'DESC',
      limit = 10,
      offset = 0,
    } = query;

    return this.productRepo.findAndCountAll({
      where: search
        ? { name: { [Op.iLike]: `%${search}%` } }
        : undefined,
      order: [[sort, order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']],
      limit: Math.min(+limit, 100),
      offset: +offset,
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findByPk(id);
    if (!product) throw new NotFoundException('Mahsulot topilmadi');
    return product;
  }

  async update(id: number, dto: CreateProductDto) {
    const product = await this.productRepo.findByPk(id);
    return product?.update(dto);
  }


  async updateImage(id: number, payload: UpdateProductImageDto) {
    const foundedPrd = await this.productRepo.findByPk(id);

    if (!foundedPrd) {
      throw new NotFoundException('Product topilmadi');
    }

    if (!payload.image) {
      throw new BadRequestException('Iltimos rasm yuboring');
    }

    if (foundedPrd.image) {
      await this.fsHelper.removeFiles(foundedPrd.image);
    }

    const image = await this.fsHelper.uploadFile(payload.image);

    await this.productRepo.update({ image: image.fileUrl }, { where: { id } });

    return {
      message: 'yangilandi',
    };
  }

  async remove(id: number) {
    const product = await this.productRepo.findByPk(id);
    let prd = product
    await product?.destroy();
    return prd

=======
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private client: PrismaService) {}
  async create(data: CreateProductDto) {
    let restaurant = await this.client.restaurant.findUnique({
      where: { id: data.restaurantId },
    });
    if (!restaurant) throw new NotFoundException('restaurant not found');
    let category = await this.client.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) throw new NotFoundException('category not found');
    let prd = await this.client.product.create({ data });
    return prd;
  }

  async findAll(
    restaurantId: number,
    filter: string,
    page: number,
    limit: number,
    categoryId: number,
  ) {
    let take = limit || 10;
    let skip = page ? (page - 1) * take : 0;
    let where: any = {};
    if (restaurantId) {
      where.restaurantId = restaurantId;
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (filter) {
      where.name = {
        startWith: filter,
      };
    }

    let prd = await this.client.product.findMany({ where, skip, take });
    return prd;
  }

  async findOne(id: number) {
    let prd = await this.client.product.findUnique({ where: { id } });
    if (!prd) throw new NotFoundException('product not found');
    return prd;
  }

  async update(id: number, data: UpdateProductDto) {
    let prd = await this.client.product.findUnique({ where: { id } });
    if (!prd) throw new NotFoundException('product not found');
    let updated = await this.client.product.update({ where: { id }, data });
    return updated;
  }

  async remove(id: number) {
    let prd = await this.client.product.findUnique({ where: { id } });
    if (!prd) throw new NotFoundException('product not found');
    let deleted = await this.client.product.delete({ where: { id } });
    return deleted;
>>>>>>> 5e9747d52eda172d0aa1d8646a3f9f542e77c33d
  }
}
