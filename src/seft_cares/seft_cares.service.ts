import { Injectable } from '@nestjs/common';
import { CreateSeftCareDto } from './dto/create-seft_care.dto';
import { UpdateSeftCareDto } from './dto/update-seft_care.dto';

@Injectable()
export class SeftCaresService {
  create(createSeftCareDto: CreateSeftCareDto) {
    return 'This action adds a new seftCare';
  }

  findAll() {
    return `This action returns all seftCares`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seftCare`;
  }

  update(id: number, updateSeftCareDto: UpdateSeftCareDto) {
    return `This action updates a #${id} seftCare`;
  }

  remove(id: number) {
    return `This action removes a #${id} seftCare`;
  }
}
