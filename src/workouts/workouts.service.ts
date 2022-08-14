import { Workout } from 'src/workouts/entities/workout.entity';
import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Image } from 'src/image/entities/image.entity';

@Injectable()
export class WorkoutsService {
  async create(createWorkoutDto: CreateWorkoutDto) {
    try {
      const { images } = createWorkoutDto;
      delete createWorkoutDto.images;
      const spa = await getRepository(Workout)
        .createQueryBuilder('workout')
        .insert()
        .values(createWorkoutDto)
        .execute();
      const { insertId } = spa.raw;
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], workout: insertId })
            .execute();
        }
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Workout Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Create Workout Fail !',
      };
    }
  }

  findAll() {
    return `This action returns all workouts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workout`;
  }

  async update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    try {
      const { images } = updateWorkoutDto;
      delete updateWorkoutDto.images;
      await getRepository(Workout)
        .createQueryBuilder('workout')
        .update()
        .set(updateWorkoutDto)
        .where('id = :id', { id })
        .execute();
      if (images.length > 0) {
        await getRepository(Image)
          .createQueryBuilder('image')
          .delete()
          .where('workoutId = :id', { id })
          .execute();
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], workout: id })
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
      await getRepository(Workout)
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Delete Workout Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Delete Workout Fail !',
      };
    }
  }
}
