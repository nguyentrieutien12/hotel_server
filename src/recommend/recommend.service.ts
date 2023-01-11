import { Hotel } from './../hotels/entities/hotel.entity';
import { BodyRecovery } from './../body_recovery/entities/body_recovery.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Recommend } from './entities/recommend.entity';
import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateRecommendDto } from './dto/create-recommend.dto';
import { UpdateRecommendDto } from './dto/update-recommend.dto';
import { Spa } from 'src/spas/entities/spa.entity';
import { Gym } from 'src/gyms/entities/gym.entity';
import { Image } from 'src/image/entities/image.entity';

@Injectable()
export class RecommendService {
  async createRes(createRecommendDto: CreateRecommendDto) {
    try {
      const recommend = await getRepository(Recommend)
        .createQueryBuilder('recommend')
        .where('restaurantId = :restaurantId', {
          restaurantId: createRecommendDto['id'],
        })
        .getOne();
      if (!recommend) {
        await getRepository(Recommend)
          .createQueryBuilder('recommend')
          .insert()
          .values({
            restaurant: createRecommendDto['id'],
            type: createRecommendDto['type'],
            hotel: createRecommendDto['hotel'],
          })
          .execute();
        return {
          statusCode: HttpStatus.CREATED,
          message: `Save Recomment Successfully !`,
        };
      } else {
        await getRepository(Recommend)
          .createQueryBuilder('recommend')
          .delete()
          .where('restaurantId = :restaurantId', {
            restaurantId: createRecommendDto['id'],
          })
          .execute();
        return {
          statusCode: HttpStatus.CREATED,
          message: `Unflow Recomment Successfully !`,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Save Recomment Fail !`,
      };
    }
  }
  async createGym(createRecommendDto: CreateRecommendDto) {
    try {
      const recommend = await getRepository(Recommend)
        .createQueryBuilder('recommend')
        .where('gymId = :gymId', {
          gymId: createRecommendDto['id'],
        })
        .getOne();
      if (!recommend) {
        await getRepository(Recommend)
          .createQueryBuilder('recommend')
          .insert()
          .values({
            gym: createRecommendDto['id'],
            type: createRecommendDto['type'],
            hotel: createRecommendDto['hotel'],
          })
          .execute();
        return {
          statusCode: HttpStatus.CREATED,
          message: `Save Recomment Successfully !`,
        };
      } else {
        await getRepository(Recommend)
          .createQueryBuilder('recommend')
          .delete()
          .where('gymId = :gymId', {
            gymId: createRecommendDto['id'],
          })
          .execute();
        return {
          statusCode: HttpStatus.CREATED,
          message: `Unflow Recomment Successfully !`,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Save Recomment Fail !`,
      };
    }
  }
  async createSpa(createRecommendDto: CreateRecommendDto) {
    try {
      const recommend = await getRepository(Recommend)
        .createQueryBuilder('recommend')
        .where('spaId = :spaId', {
          spaId: createRecommendDto['id'],
        })
        .getOne();
      if (!recommend) {
        await getRepository(Recommend)
          .createQueryBuilder('recommend')
          .insert()
          .values({
            spa: createRecommendDto['id'],
            type: createRecommendDto['type'],
            hotel: createRecommendDto['hotel'],
          })
          .execute();
        return {
          statusCode: HttpStatus.CREATED,
          message: `Save Recomment Successfully !`,
        };
      } else {
        await getRepository(Recommend)
          .createQueryBuilder('recommend')
          .delete()
          .where('spaId = :spaId', {
            spaId: createRecommendDto['id'],
          })
          .execute();
        return {
          statusCode: HttpStatus.CREATED,
          message: `Unflow Recomment Successfully !`,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Save Recomment Fail !`,
      };
    }
  }
  async createRecovery(createRecommendDto: CreateRecommendDto) {
    try {
      const recovery = await getRepository(Recommend)
        .createQueryBuilder('recommend')
        .where('bodyRecoveryId = :bodyRecoveryId', {
          bodyRecoveryId: createRecommendDto['id'],
        })
        .getOne();
      if (!recovery) {
        await getRepository(Recommend)
          .createQueryBuilder('recommend')
          .insert()
          .values({
            body_recovery: createRecommendDto['id'],
            type: createRecommendDto['type'],
          })
          .execute();
        return {
          statusCode: HttpStatus.CREATED,
          message: `Save Recomment Successfully !`,
        };
      } else {
        await getRepository(Recommend)
          .createQueryBuilder('recommend')
          .delete()
          .where('bodyRecoveryId = :bodyRecoveryId', {
            bodyRecoveryId: createRecommendDto['id'],
          })
          .execute();
        return {
          statusCode: HttpStatus.CREATED,
          message: `Unflow Recomment Successfully !`,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Save Recomment Fail !`,
      };
    }
  }
  async findAll() {
    try {
      return await getRepository(Recommend)
        .createQueryBuilder('recommend')
        .leftJoinAndMapOne(
          'recommend.restaurants',
          Restaurant,
          'restaurants',
          'restaurants.id = recommend.restaurantId',
        )
        .leftJoinAndMapOne(
          'recommend.spas',
          Spa,
          'spas',
          'spas.id = recommend.spaId',
        )
        .leftJoinAndMapOne(
          'recommend.gyms',
          Gym,
          'gyms',
          'gyms.id = recommend.gymId',
        )
        .leftJoinAndMapOne(
          'recommend.recoverys',
          BodyRecovery,
          'bodyRecovery',
          'bodyRecovery.id = recommend.bodyRecoveryId',
        )
        .getMany();
    } catch (error) {}
  }
  async getAll() {
    try {
      const recommend = await getRepository(Recommend)
        .createQueryBuilder('recommend')
        .leftJoinAndMapOne(
          'recommend.hotel',
          Hotel,
          'hotel',
          'hotel.id = recommend.hotelId',
        )
        .leftJoinAndMapOne(
          'recommend.spa',
          Spa,
          'spa',
          'spa.id = recommend.spaId',
        )
        .leftJoinAndMapMany(
          'recommend.imagesspa',
          Image,
          'imageSpa',
          'imageSpa.spaId = spa.id',
        )

        .leftJoinAndMapOne(
          'recommend.restaurant',
          Restaurant,
          'restaurant',
          'restaurant.id = recommend.restaurantId',
        )
        .leftJoinAndMapMany(
          'recommend.imagesrestaurant',
          Image,
          'imageRestaurant',
          'imageRestaurant.restaurantId = restaurant.id',
        )
        .leftJoinAndMapOne(
          'recommend.gym',
          Gym,
          'gym',
          'gym.id = recommend.gymId',
        )
        .leftJoinAndMapMany(
          'recommend.imagesgym',
          Image,
          'imageGym',
          'imageGym.gymId = gym.id',
        )
        .getMany();

      const recovery = await getRepository(Recommend)
        .createQueryBuilder('recommend')
        .leftJoinAndMapOne(
          'recommend.recoverys',
          BodyRecovery,
          'bodyRecovery',
          'bodyRecovery.id = recommend.bodyRecoveryId',
        )
        .leftJoinAndMapOne(
          'recommend.image',
          Image,
          'image',
          'image.bodyRecoveryId = recommend.bodyRecoveryId',
        )
        .getMany();

      return {
        recommend,
        recovery,
      };
    } catch (error) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} recommend`;
  }

  update(id: number, updateRecommendDto: UpdateRecommendDto) {
    return `This action updates a #${id} recommend`;
  }

  remove(id: number) {
    return `This action removes a #${id} recommend`;
  }
}
