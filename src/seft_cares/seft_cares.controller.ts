import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeftCaresService } from './seft_cares.service';
import { CreateSeftCareDto } from './dto/create-seft_care.dto';
import { UpdateSeftCareDto } from './dto/update-seft_care.dto';

@Controller('seft-cares')
export class SeftCaresController {
  constructor(private readonly seftCaresService: SeftCaresService) {}

  @Post()
  create(@Body() createSeftCareDto: CreateSeftCareDto) {
    return this.seftCaresService.create(createSeftCareDto);
  }

  @Get()
  findAll() {
    return this.seftCaresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seftCaresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeftCareDto: UpdateSeftCareDto) {
    return this.seftCaresService.update(+id, updateSeftCareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seftCaresService.remove(+id);
  }
}
