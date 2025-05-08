import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionModule } from './region/region.module';
import { PrismaModule } from './prisma/prisma.module';
import { DebtModule } from './debt/debt.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [RegionModule, PrismaModule, DebtModule, OrderModule, OrderItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
