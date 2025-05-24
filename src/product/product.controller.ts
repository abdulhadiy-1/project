import {
  Controller,
  Get,
  Post,
  Body,
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
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

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
  }
}
