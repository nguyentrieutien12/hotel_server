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
import { SpasService } from './spas.service';
import { CreateSpaDto } from './dto/create-spa.dto';
import { UpdateSpaDto } from './dto/update-spa.dto';

@Controller('spas')
export class SpasController {
  constructor(private readonly spasService: SpasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createSpaDto: CreateSpaDto) {
    return await this.spasService.create(createSpaDto);
  }

  @Get()
  async findAll() {
    return await this.spasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.spasService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateSpaDto: UpdateSpaDto) {
    return this.spasService.update(+id, updateSpaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.spasService.remove(+id);
  }
}
