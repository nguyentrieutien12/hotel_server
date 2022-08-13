import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { Image } from 'src/image/entities/image.entity';

@Injectable()
export class RestaurantsService {
  async create(createRestaurantDto: CreateRestaurantDto) {
    try {
      const { images } = createRestaurantDto;
      delete createRestaurantDto.images;
      const spa = await getRepository(Restaurant)
        .createQueryBuilder('restaurant')
        .insert()
        .values(createRestaurantDto)
        .execute();
      const { insertId } = spa.raw;
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], restaurant: insertId })
            .execute();
        }
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Spa Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Create Spa Fail !',
      };
    }
  }

  findAll() {
    return `This action returns all restaurants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    try {
      const { images } = updateRestaurantDto;
      delete updateRestaurantDto.images;
      await getRepository(Restaurant)
        .createQueryBuilder('spa')
        .update()
        .set(updateRestaurantDto)
        .where('id = :id', { id })
        .execute();
      if (images.length > 0) {
        await getRepository(Image)
          .createQueryBuilder('image')
          .delete()
          .where('restaurantId = :id', { id })
          .execute();
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], restaurant: id })
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
      await getRepository(Restaurant)
        .createQueryBuilder('restaurant')
        .delete()
        .where('id = :id', { id })
        .execute();

      return {
        message: 'Delete Restaurant SuccessFully !',
        statusCode: HttpStatus.ACCEPTED,
      };
    } catch (error) {
      return {
        message: 'Delete Restaurant Fail !',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
