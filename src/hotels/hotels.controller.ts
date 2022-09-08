import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }
  @Get()
  async findAll() {
    return await this.hotelsService.findAll();
  }

  @Get('spa/:id')
  async findOneSpa(@Param('id') id: string) {
    return await this.hotelsService.findOneSpa(+id);
  }
  @Get('restaurant/:id')
  async findOneRestaurant(@Param('id') id: string) {
    const result = await this.hotelsService.findOneRestaurant(+id);
    return result;
  }
  @Get('gym/:id')
  async findOneGym(@Param('id') id: string) {
    return await this.hotelsService.findOneGym(+id);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.hotelsService.findOne(+id);
  }
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateHotelDto: UpdateHotelDto,
  ) {
    return await this.hotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.hotelsService.remove(+id);
  }
}
