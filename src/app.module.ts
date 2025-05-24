import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { RoleGuard } from './guards/role.guard';
import { AuthModel } from './auth/auth.model';
import { Product } from './product/product.modules';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: console.log,
      models: [AuthModel, Product],
      sync: {
        alter: true,
        // force: true
      },
      autoLoadModels: true,
    }),
    AuthModule,
    ProductModule
    
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }
  ]
})

export class AppModule {
  constructor() {
    console.log("Db_pss",process.env.DB_PASSWORD);
    
  }
}
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { OrderModule } from './order/order.module';
import { DebtModule } from './debt/debt.module';
import { RegionModule } from './region/region.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { TgModule } from './tg/tg.module';

@Module({
  imports: [
    RegionModule,
    PrismaModule,
    RestaurantModule,
    UserModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    WithdrawModule,
    DebtModule,
    TgModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
>>>>>>> 5e9747d52eda172d0aa1d8646a3f9f542e77c33d
