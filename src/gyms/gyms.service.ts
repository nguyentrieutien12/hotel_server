import { Gym } from 'src/gyms/entities/gym.entity';
import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { Image } from 'src/image/entities/image.entity';

@Injectable()
export class GymsService {
  async create(createGymDto: CreateGymDto) {
    try {
      const { images } = createGymDto;
      delete createGymDto.images;
      const spa = await getRepository(Gym)
        .createQueryBuilder('gym')
        .insert()
        .values(createGymDto)
        .execute();
      const { insertId } = spa.raw;
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], gym: insertId })
            .execute();
        }
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Gym Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Create Gym Fail !',
      };
    }
  }

  findAll() {
    return `This action returns all gyms`;
  }

  async findOne(id: number) {
    return await getRepository(Gym)
      .createQueryBuilder('gym')
      .leftJoinAndMapOne('gym.image', Image, 'image', 'gym.id = image.gymId')
      .leftJoinAndSelect('gym.workouts', 'workout', 'gym.id = workout.gymId')
      .leftJoinAndMapMany(
        'workout.images',
        Image,
        'images',
        'workout.id = images.workoutId',
      )
      .where('workout.gymId = :id', { id })
      .orderBy('workout.id', 'DESC')
      .getMany();
  }

  async update(id: number, updateGymDto: UpdateGymDto) {
    try {
      const { images } = updateGymDto;
      delete updateGymDto.images;
      await getRepository(Gym)
        .createQueryBuilder('gym')
        .update()
        .set(updateGymDto)
        .where('id = :id', { id })
        .execute();
      if (images.length > 0) {
        await getRepository(Image)
          .createQueryBuilder('image')
          .delete()
          .where('gymId = :id', { id })
          .execute();
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], gym: id })
            .execute();
        }
      }
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Update Gym Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Update Gym Fail !',
      };
    }
  }

  async remove(id: number) {
    try {
      await getRepository(Gym)
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Delete Gym Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Delete Gym Fail !',
      };
    }
  }
}
