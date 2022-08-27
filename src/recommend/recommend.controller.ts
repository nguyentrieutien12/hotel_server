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
  async createRes(@Body() createRecommendDto: any) {
    return await this.recommendService.createRes(createRecommendDto);
  }
  @Post('/gym')
  async createGym(@Body() createRecommendDto: any) {
    return await this.recommendService.createGym(createRecommendDto);
  }
  @Post('/spa')
  async createSpa(@Body() createRecommendDto: any) {
    return await this.recommendService.createSpa(createRecommendDto);
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
