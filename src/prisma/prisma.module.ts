import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

<<<<<<< HEAD
@Global()
@Module({
  providers: [PrismaService],
  exports:[PrismaService]
=======

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
>>>>>>> f50a46cef7b266ed0b7bb3840486f6ddde4ba2e0
})
export class PrismaModule {}
