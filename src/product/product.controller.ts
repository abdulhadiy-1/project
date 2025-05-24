import {
  Controller,
  Get,
  Post,
  Body,
<<<<<<< HEAD
  Param,
  Delete,
  Patch,
  Query,
  ParseIntPipe,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProductImageDto } from './dto/update-product-image.dto';



@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi mahsulot yaratish' })
  @ApiResponse({ status: 201, description: 'Mahsulot muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 400, description: 'Noto`g`ri ma`lumotlar' })
=======
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RoleD } from 'src/user/decorators/roles.decorstor';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @RoleD(Role.OWNER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
>>>>>>> 5e9747d52eda172d0aa1d8646a3f9f542e77c33d
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

<<<<<<< HEAD
  @Get()
  @ApiOperation({ summary: 'Barcha mahsulotlarni olish (filter, sort, pagination bilan)' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sort', required: false, type: String, example: 'price' })
  @ApiQuery({ name: 'order', required: false, type: String, example: 'DESC' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
  @ApiResponse({ status: 200, description: 'Mahsulotlar ro`yxati' })
  findAll(@Query() query: any) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo`yicha bitta mahsulotni olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Mahsulot topildi' })
  @ApiResponse({ status: 404, description: 'Mahsulot topilmadi' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mahsulot ma`lumotlarini qisman yangilash (PATCH)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Mahsulot muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 404, description: 'Yangilanadigan mahsulot topilmadi' })
  @ApiResponse({ status: 400, description: 'Yaroqsiz DTO ma`lumotlari' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateProductDto, 
  ) {
    return this.productService.update(id,dto);
  }

  @ApiOperation({ summary: 'Product rasmini yangilash/yaratish' })
  @ApiConsumes('multipart/form-data')
  @Put(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  async updateUserImage(
    @Body() payload: UpdateProductImageDto,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.productService.updateImage(id, { image });
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Mahsulotni o`chirish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Mahsulot muvaffaqiyatli o`chirildi' })
  @ApiResponse({ status: 404, description: 'Mahsulot topilmadi' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
=======
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
  @ApiQuery({
    name: 'categoryId',
    required: false,
  })
  @Get()
  findAll(
    @Query('restaurantId') restaurantId: string,
    @Query('filter') filter: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('categoryId') categoryId: string,
  ) {
    return this.productService.findAll(+restaurantId, filter, +page, +limit, +categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @RoleD(Role.OWNER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @RoleD(Role.OWNER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
>>>>>>> 5e9747d52eda172d0aa1d8646a3f9f542e77c33d
  }
}
