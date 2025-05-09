import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateRegionDto) {
    try {
      let region = await this.prisma.region.create({ data })
      return region;
    } catch (error) {
      throw new Error(`Creating error! ${error.message}`)
    }
  }

  async findAll(page: number, limit: number) {
    try {
      page = Number(page);
      limit = Number(limit);
      const skip = (page - 1) * limit
      let regions = await this.prisma.region.findMany({
        skip,
        take: limit,
      });
      return regions
    } catch (error) {
      throw new Error(`findAll error! ${error.message}`)
    }
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.region.findFirst({ where: { id } })
      return one;
    } catch (error) {
      throw new Error(`findOne error! ${error.message}`)
    }
  }

  async update(id: number, data: UpdateRegionDto) {
    try {
      let updated = await this.prisma.region.update({ where: { id }, data })
      return updated
    } catch (error) {
      throw new Error(`update error! ${error.message}`)
    }
  }

  async remove(id: number) {
    try {
      let deleted = await this.prisma.region.delete({ where: { id } })
      return (`Region deleted ${deleted.name}`)
    } catch (error) {
      throw new Error(`delete error! ${error.message}`)
    }
  }
}
