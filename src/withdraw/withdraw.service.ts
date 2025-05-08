import { Injectable } from '@nestjs/common';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WithdrawService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateWithdrawDto) {
    try{
      let withdraw = await this.prisma.withdraw.create({
        data})
      return withdraw
    }catch(error){
      throw new Error(`Creating error! ${error.message}`)
    }
    
    

  }


  async findAll(page: number, limit: number) {
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;
    let withdraws = await this.prisma.withdraw.findMany({
      skip,
      take: limit,
      include: {
        order: true,
        restaurant: true
      }
    })
    return withdraws;
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.withdraw.findFirst({ where: { id } })
    } catch (error) {
      throw new error(`findOne error ${error.message}`)
    }

  }

  async update(id: number, data: UpdateWithdrawDto) {
    try {
      let updated = await this.prisma.withdraw.update({ where: { id }, data })
      return updated
    } catch (error) {
      throw new error(`update error ${error.message}`)
    }

  }

  async remove(id: number) {
    try {
      let deleted = await this.prisma.withdraw.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new error(`remove error ${error.message}`)
    }
  }
}
