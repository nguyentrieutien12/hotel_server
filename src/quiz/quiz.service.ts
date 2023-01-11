import { Hotel } from './../hotels/entities/hotel.entity';
import { Quiz } from './entities/quiz.entity';
import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  async create(createQuizDto: any) {
    try {
      await getRepository(Quiz)
        .createQueryBuilder('quiz')
        .insert()
        .values(createQuizDto)
        .execute();

      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll() {
    const hotels = await getRepository(Quiz)
      .createQueryBuilder('quiz')
      .innerJoinAndMapOne(
        'quiz.hotels',
        Hotel,
        'hotels',
        'hotels.id = quiz.hotelId',
      ).distinct(true)
      .getMany();
console.log(hotels);

    const quizs = await getRepository(Quiz)
      .createQueryBuilder('quiz')
      .innerJoinAndMapOne(
        'quiz.hotels',
        Hotel,
        'hotels',
        'hotels.id = quiz.hotelId',
      )
      .getMany();
    return {
      hotels,
      quizs,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
