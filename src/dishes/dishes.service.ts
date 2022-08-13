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
    return await getRepository(Restaurant)
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect(
        'restaurant.dishs',
        'dish',
        'restaurant.id = dish.restaurantId',
      )
      .leftJoinAndMapMany(
        'dish.images',
        Image,
        'image',
        'dish.id = image.dishId',
      )
      .where('dish.restaurantId = :id', { id })
      .orderBy('restaurant.id', 'DESC')
      .getMany();
  }

  update(id: number, updateDishDto: UpdateDishDto) {
    return `This action updates a #${id} dish`;
  }

  remove(id: number) {
    return `This action removes a #${id} dish`;
  }
}
