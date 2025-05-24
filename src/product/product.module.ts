import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AppModule } from 'src/app.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.modules';
import { FsHelper } from 'src/helpers';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]), // если используешь Sequelize модели
  ],
    controllers: [ProductController],
  providers: [ProductService, FsHelper],
})
export class ProductModule {}
