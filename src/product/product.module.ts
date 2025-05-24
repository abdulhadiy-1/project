import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
<<<<<<< HEAD
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
=======

@Module({
  controllers: [ProductController],
  providers: [ProductService],
>>>>>>> 5e9747d52eda172d0aa1d8646a3f9f542e77c33d
})
export class ProductModule {}
