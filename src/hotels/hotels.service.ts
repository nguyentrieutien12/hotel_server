import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { Image } from 'src/image/entities/image.entity';
var QRCode = require('qrcode');
import { link } from 'src/contains/port.contain';
import { Qrcode } from 'src/qrcode/entities/qrcode.entity';
import { Spa } from 'src/spas/entities/spa.entity';
console.log(process.env.PORT);
@Injectable()
export class HotelsService {
  async create(createHotelDto: CreateHotelDto) {
    try {
      const { hotel_email } = createHotelDto;
      const findHotel = await getRepository(Hotel).findOne({ hotel_email });
      if (findHotel) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'Hotel email already exists, please register with another email',
        };
      }
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
      .leftJoinAndSelect('hotel.images', 'image')
      .innerJoinAndMapOne(
        'hotel.qr',
        Qrcode,
        'qrcode',
        'qrcode.hotel = hotel.id',
      )
      .orderBy('hotel.id', 'DESC')
      .getMany();
  }
  async findOneRestaurant(id: number) {
    return await getRepository(Hotel)
      .createQueryBuilder('hotel')
      .leftJoinAndSelect(
        'hotel.restaurants',
        'restaurant',
        'hotel.id = restaurant.hotelId',
      )
      .leftJoinAndMapMany(
        'restaurant.images',
        Image,
        'image',
        'restaurant.id = image.restaurantId',
      )
      .where('restaurant.hotelId = :id', { id })
      .orderBy('restaurant.id', 'DESC')
      .getMany();
  }
  async findOneGym(id: number) {
    try {
      return await getRepository(Hotel)
        .createQueryBuilder('hotel')
        .leftJoinAndSelect('hotel.gyms', 'gym', 'hotel.id = gym.hotelId')
        .leftJoinAndMapMany(
          'gym.images',
          Image,
          'image',
          'gym.id = image.gymId',
        )
        .where('gym.hotelId = :id', { id })
        .orderBy('gym.id', 'DESC')
        .getMany();
    } catch (error) {}
  }
  async findOneSpa(id: number) {
    return await getRepository(Hotel)
      .createQueryBuilder('hotel')
      .leftJoinAndSelect('hotel.spas', 'spa', 'hotel.id = spa.hotelId')
      .leftJoinAndMapMany('spa.images', Image, 'image', 'spa.id = image.spaId')
      .where('spa.hotelId = :id', { id })
      .orderBy('spa.id', 'DESC')
      .getMany();
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    try {
      const { images, hotel_email } = updateHotelDto;
      const hotel = await getRepository(Hotel)
        .createQueryBuilder('hotel')
        .where('hotel_email = :hotel_email', { hotel_email })
        .andWhere('id != :id', { id })
        .getOne();
      if (hotel) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'Hotel email already exists, please register with another email',
        };
      }
      delete updateHotelDto.images;
      await getRepository(Hotel)
        .createQueryBuilder('hotel')
        .update()
        .set(updateHotelDto)
        .where('id = :id', { id })
        .execute();
      if (images.length > 0) {
        await getRepository(Image)
          .createQueryBuilder('image')
          .delete()
          .where('hotelId = :id', { id })
          .execute();
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], hotel: id })
            .execute();
        }
      }
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Update Hotel Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Update Hotel Fail !',
      };
    }
  }

  async remove(id: number) {
    try {
      await getRepository(Hotel)
        .createQueryBuilder('hotel')
        .delete()
        .where('id = :id', { id })
        .execute();

      return {
        message: 'Delete Hotel SuccessFully !',
        statusCode: HttpStatus.ACCEPTED,
      };
    } catch (error) {
      return {
        message: 'Delete Hotel Fail !',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
