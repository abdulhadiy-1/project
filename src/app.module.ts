import { Module } from '@nestjs/common';
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
