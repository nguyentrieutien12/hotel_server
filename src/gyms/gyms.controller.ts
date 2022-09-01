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
import { GymsService } from './gyms.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';

@Controller('gyms')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createGymDto: CreateGymDto) {
    return await this.gymsService.create(createGymDto);
  }

  @Get()
  findAll() {
    return this.gymsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gymsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGymDto: UpdateGymDto) {
    return await this.gymsService.update(+id, updateGymDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.gymsService.remove(+id);
  }
}
