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
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleD } from 'src/user/decorators/roles.decorstor';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/role/role.guard';
import { ApiQuery } from '@nestjs/swagger';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
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
    @Query('filter') filter: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.restaurantService.findAll(filter, +page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @RoleD(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }
  @RoleD(Role.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }
}
