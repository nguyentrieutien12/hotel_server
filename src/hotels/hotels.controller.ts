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
  findOneSpa(@Param('id') id: string) {
    return this.hotelsService.findOneSpa(+id);
  }
  @Get('restaurant/:id')
  findOneRestaurant(@Param('id') id: string) {
    return this.hotelsService.findOneRestaurant(+id);
  }
  @Get('gym/:id')
  findOneGym(@Param('id') id: string) {
    return this.hotelsService.findOneGym(+id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
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
