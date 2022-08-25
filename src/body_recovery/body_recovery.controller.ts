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
import { BodyRecoveryService } from './body_recovery.service';
import { CreateBodyRecoveryDto } from './dto/create-body_recovery.dto';
import { UpdateBodyRecoveryDto } from './dto/update-body_recovery.dto';

@Controller('body-recovery')
export class BodyRecoveryController {
  constructor(private readonly bodyRecoveryService: BodyRecoveryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createBodyRecoveryDto: CreateBodyRecoveryDto) {
    return await this.bodyRecoveryService.create(createBodyRecoveryDto);
  }

  @Get()
  async findAll() {
    return await this.bodyRecoveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bodyRecoveryService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBodyRecoveryDto: UpdateBodyRecoveryDto,
  ) {
    return await this.bodyRecoveryService.update(+id, updateBodyRecoveryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bodyRecoveryService.remove(+id);
  }
}
