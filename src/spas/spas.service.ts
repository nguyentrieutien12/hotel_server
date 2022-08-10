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

  findOne(id: number) {
    return `This action returns a #${id} spa`;
  }

  update(id: number, updateSpaDto: UpdateSpaDto) {
    return `This action updates a #${id} spa`;
  }

  remove(id: number) {
    return `This action removes a #${id} spa`;
  }
}
