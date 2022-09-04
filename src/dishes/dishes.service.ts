import { Restaurant } from './../restaurants/entities/restaurant.entity';
import { Dish } from 'src/dishes/entities/dish.entity';
import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Image } from 'src/image/entities/image.entity';

@Injectable()
export class DishesService {
  async create(createDishDto: CreateDishDto) {
    try {
      const { images } = createDishDto;
      delete createDishDto.images;
      const spa = await getRepository(Dish)
        .createQueryBuilder('dish')
        .insert()
        .values(createDishDto)
        .execute();
      const { insertId } = spa.raw;
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], dish: insertId })
            .execute();
        }
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Treatment Successfully !',
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Create Treatment Fail !',
      };
    }
  }

  findAll() {
    return `This action returns all dishes`;
  }

  async findOne(id: number) {
    return new Promise(async (res) => {
      const dishes = await getRepository(Restaurant)
        .createQueryBuilder('restaurant')
        .leftJoinAndMapOne(
          'restaurant.image',
          Image,
          'image',
          'restaurant.id = image.restaurantId',
        )
        .leftJoinAndSelect(
          'restaurant.dishs',
          'dish',
          'restaurant.id = dish.restaurantId',
        )
        .leftJoinAndMapMany(
          'dish.images',
          Image,
          'images',
          'dish.id = images.dishId',
        )
        .where('dish.restaurantId = :id', { id })
        .orderBy('restaurant.id', 'DESC')
        .getMany();
      setTimeout(() => {
        res(dishes);
      }, 1000);
    });
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    try {
      const { images } = updateDishDto;
      delete updateDishDto.images;
      await getRepository(Dish)
        .createQueryBuilder('dish')
        .update()
        .set(updateDishDto)
        .where('id = :id', { id })
        .execute();
      if (images.length > 0) {
        await getRepository(Image)
          .createQueryBuilder('image')
          .delete()
          .where('dishId = :id', { id })
          .execute();
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], dish: id })
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
      await getRepository(Dish)
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Delete Dish Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Delete Dish Fail !',
      };
    }
  }
}
