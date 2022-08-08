import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsService {
  async create(createHotelDto: CreateHotelDto) {
    try {
      const images = createHotelDto.images;
      delete createHotelDto.images;
      const hotel = await getRepository(Hotel)
        .createQueryBuilder('account')
        .insert()
        .values(createHotelDto)
        .execute();
      console.log();
      const { insertId } = hotel.raw;
      console.log(insertId);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Hotel Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Hotel Fail !',
      };
    }
  }

  findAll() {
    return `This action returns all hotels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotel`;
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
