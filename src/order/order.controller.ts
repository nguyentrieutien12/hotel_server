import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/restaurant')
  async createRestaurant(@Body() createOrderDto: any) {
    return await this.orderService.createRestaurant(createOrderDto);
  }
  @Post('/gym')
  async createGym(@Body() createOrderDto: any) {
    return await this.orderService.createGym(createOrderDto);
  }
  @Post('/spa')
  async createSpa(@Body() createOrderDto: any) {
    return await this.orderService.createSpa(createOrderDto);
  }

  @Get()
  async findOne() {
    return await this.orderService.findOne();
  }
  @Get('/all')
  async findAll() {
    return await this.orderService.findAll();
  }
  @Get('/top')
  async findTop() {
    return await this.orderService.findTop();
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
