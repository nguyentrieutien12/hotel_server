import { BodyRecovery } from './entities/body_recovery.entity';
import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateBodyRecoveryDto } from './dto/create-body_recovery.dto';
import { UpdateBodyRecoveryDto } from './dto/update-body_recovery.dto';
import { Image } from 'src/image/entities/image.entity';
import { Video } from 'src/video/entities/video.entity';

@Injectable()
export class BodyRecoveryService {
  async create(createBodyRecoveryDto: CreateBodyRecoveryDto) {
    try {
      const { images, video_url } = createBodyRecoveryDto;
      delete createBodyRecoveryDto.images;
      delete createBodyRecoveryDto.images;
      const bodyRecovery = await getRepository(BodyRecovery)
        .createQueryBuilder('body_recovery')
        .insert()
        .values(createBodyRecoveryDto)
        .execute();
      const { insertId } = bodyRecovery.raw;
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], body_recovery: insertId })
            .execute();
        }
      }
      if (video_url) {
        await getRepository(Video)
          .createQueryBuilder('video')
          .insert()
          .values({ video_url, body_recovery: insertId })
          .execute();
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Body Recovery Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Create Gym Fail !',
      };
    }
  }

  async findAll() {
    return await getRepository(BodyRecovery)
      .createQueryBuilder('body_recovery')
      .innerJoinAndSelect('body_recovery.recovery', 'recovery')
      .leftJoinAndMapOne(
        'body_recovery.image',
        Image,
        'image',
        'body_recovery.id = image.bodyRecoveryId',
      )
      .leftJoinAndMapOne(
        'body_recovery.video',
        Video,
        'video',
        'body_recovery.id = video.bodyRecoveryId',
      )
      .orderBy('body_recovery.id', 'DESC')
      .getMany();
  }

  async findOne(id: number) {
    return await getRepository(BodyRecovery)
      .createQueryBuilder('body_recovery')
      .innerJoinAndSelect('body_recovery.recovery', 'recovery')
      .leftJoinAndMapOne(
        'body_recovery.image',
        Image,
        'image',
        'body_recovery.id = image.bodyRecoveryId',
      )
      .leftJoinAndMapOne(
        'body_recovery.video',
        Video,
        'video',
        'body_recovery.id = video.bodyRecoveryId',
      )
      .where('body_recovery.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateBodyRecoveryDto: UpdateBodyRecoveryDto) {
    try {
      const { images, video_url } = updateBodyRecoveryDto;

      delete updateBodyRecoveryDto.images;
      delete updateBodyRecoveryDto.video_url;
      await getRepository(BodyRecovery)
        .createQueryBuilder('body_recovery')
        .update()
        .set(updateBodyRecoveryDto)
        .where('id = :id', { id })
        .execute();
      if (images.length > 0) {
        await getRepository(Image)
          .createQueryBuilder('image')
          .delete()
          .where('bodyRecoveryId = :id', { id })
          .execute();
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], body_recovery: id })
            .execute();
        }
      }
      if (video_url) {
        await getRepository(Video)
          .createQueryBuilder('video')
          .delete()
          .where('bodyRecoveryId = :id', { id })
          .execute();
        await getRepository(Video)
          .createQueryBuilder('video')
          .insert()
          .values({ video_url: video_url, body_recovery: id })
          .execute();
      }
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Update Body Recovery Successfully !',
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Update Body Recovery Fail !',
      };
    }
  }

  async remove(id: number) {
    try {
      await getRepository(BodyRecovery)
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Delete Body Recovery Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Delete Body Recovery Fail !',
      };
    }
  }
}
