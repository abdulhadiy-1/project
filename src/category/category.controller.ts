import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RoleD } from 'src/user/decorators/roles.decorstor';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiQuery } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @RoleD(Role.OWNER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
  @ApiQuery({
    name: 'filter',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    default: 10,
  })
  @Get()
  findAll(
        @Query('restaurantId') restaurantId: string,
        @Query('filter') filter: string,
        @Query('page') page: string,
        @Query('limit') limit: string,
  ) {
    return this.categoryService.findAll(+restaurantId, filter, +page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }
  @RoleD(Role.OWNER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }
  @RoleD(Role.OWNER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
