import { Treatment } from 'src/treatments/entities/treatment.entity';
import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { Image } from 'src/image/entities/image.entity';
@Injectable()
export class TreatmentsService {
  async create(createTreatmentDto: CreateTreatmentDto) {
    try {
      const { images } = createTreatmentDto;
      delete createTreatmentDto.images;
      const spa = await getRepository(Treatment)
        .createQueryBuilder('treatment')
        .insert()
        .values(createTreatmentDto)
        .execute();
      const { insertId } = spa.raw;
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], treatment: insertId })
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
    return `This action returns all treatments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} treatment`;
  }

  async update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    try {
      const { images } = updateTreatmentDto;

      delete updateTreatmentDto.images;
      await getRepository(Treatment)
        .createQueryBuilder('spa')
        .update()
        .set(updateTreatmentDto)
        .where('id = :id', { id })
        .execute();
      if (images.length > 0) {
        await getRepository(Image)
          .createQueryBuilder('image')
          .delete()
          .where('treatmentId = :id', { id })
          .execute();
        for (let i = 0; i < images.length; i++) {
          await getRepository(Image)
            .createQueryBuilder('image')
            .insert()
            .values({ image_url: images[i], treatment: id })
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
      await getRepository(Treatment)
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Delete Treatment Successfully !',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Delete Treatment Fail !',
      };
    }
  }
}
