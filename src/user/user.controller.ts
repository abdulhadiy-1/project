import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { Role } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiQuery({
    name: 'role',
    enum: Role,
    required: false,
  })
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
    @Query('role') role: Role,
    @Query('filter') filter: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.userService.findAll(+restaurantId, role, filter, +page, +limit);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['phone', 'password'],
    },
  })
  @Post('login')
  login(@Body() data: { phone: string; password: string }) {
    return this.userService.login(data.phone, data.password);
  }
}
