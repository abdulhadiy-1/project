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

  }
}
