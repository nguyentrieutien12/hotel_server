import { Recovery } from './entities/recovery.entity';
import { getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateRecoveryDto } from './dto/create-recovery.dto';
import { UpdateRecoveryDto } from './dto/update-recovery.dto';

@Injectable()
export class RecoveryService {
  create(createRecoveryDto: CreateRecoveryDto) {
    return 'This action adds a new recovery';
  }

  async findAll() {
    return await getRepository(Recovery)
      .createQueryBuilder('recovery')
      .orderBy('recovery.id', 'DESC')
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} recovery`;
  }

  update(id: number, updateRecoveryDto: UpdateRecoveryDto) {
    return `This action updates a #${id} recovery`;
  }

  remove(id: number) {
    return `This action removes a #${id} recovery`;
  }
}
