import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateSpaDto } from './dto/create-spa.dto';
import { UpdateSpaDto } from './dto/update-spa.dto';
import { Spa } from './entities/spa.entity';
import { Image } from 'src/image/entities/image.entity';

@Injectable()
export class SpasService {
  async create(createSpaDto: CreateSpaDto) {
    try {
      const { images } = createSpaDto;
      delete createSpaDto.images;
      const spa = await getRepository(Spa)
        .createQueryBuilder('spa')
        .insert()
        .values(createSpaDto)
        .execute();
      const { insertId } = spa.raw;
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], spa: insertId })
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
    return `This action returns all spas`;
  }
  async findOne(id: number) {
    return await getRepository(Spa)
      .createQueryBuilder('spa')
      .leftJoinAndSelect(
        'spa.treatments',
        'treatment',
        'spa.id = treatment.spaId',
      )
      .leftJoinAndMapMany(
        'treatment.images',
        Image,
        'image',
        'treatment.id = image.treatmentId',
      )
      .where('treatment.spaId = :id', { id })
      .orderBy('treatment.id', 'DESC')
      .getMany();
  }

  async update(id: number, updateSpaDto: UpdateSpaDto) {
    try {
      const { images } = updateSpaDto;
      delete updateSpaDto.images;
      await getRepository(Spa)
        .createQueryBuilder('spa')
        .update()
        .set(updateSpaDto)
        .where('id = :id', { id })
        .execute();
      if (images.length > 0) {
        await getRepository(Image)
          .createQueryBuilder('image')
          .delete()
          .where('spaId = :id', { id })
          .execute();
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], spa: id })
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
      await getRepository(Spa)
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Delete Spa Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Delete Spa Fail !',
      };
    }
  }
}
