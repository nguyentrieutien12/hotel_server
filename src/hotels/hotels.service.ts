import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { Image } from 'src/image/entities/image.entity';
var QRCode = require('qrcode');
import { link } from 'src/contains/port.contain';
import { Qrcode } from 'src/qrcode/entities/qrcode.entity';
console.log(process.env.PORT);
@Injectable()
export class HotelsService {
  async create(createHotelDto: CreateHotelDto) {
    try {
      const images: string[] = createHotelDto.images;
      delete createHotelDto.images;
      const hotel = await getRepository(Hotel)
        .createQueryBuilder('account')
        .insert()
        .values(createHotelDto)
        .execute();
      const { insertId } = hotel.raw;
      for (let i = 0; i < images.length; i++) {
        await getRepository(Image)
          .createQueryBuilder('image')
          .insert()
          .values({ image_url: images[i], hotel: insertId })
          .execute();
      }
      const qr = await QRCode.toDataURL(`${link}/${insertId}`);
      await getRepository(Qrcode)
        .createQueryBuilder('qrcode')
        .insert()
        .values({ qr_link: qr, hotel: insertId })
        .execute();
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Hotel Successfully !',
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Hotel Fail !',
      };
    }
  }

  async findAll() {
    return await getRepository(Hotel)
      .createQueryBuilder('hotel')
      .innerJoinAndSelect('hotel.images', 'image')
      .innerJoinAndMapOne(
        'hotel.qr',
        Qrcode,
        'qrcode',
        'qrcode.hotel = hotel.id',
      )
      .getMany();
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
