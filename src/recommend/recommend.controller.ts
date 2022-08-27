import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { UpdateRecommendDto } from './dto/update-recommend.dto';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Post('/restaurant')
  async create(@Body() createRecommendDto: any) {
    return await this.recommendService.create(createRecommendDto);
  }

  @Get()
  async findAll() {
    return await this.recommendService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommendService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecommendDto: UpdateRecommendDto,
  ) {
    return this.recommendService.update(+id, updateRecommendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommendService.remove(+id);
  }
}
