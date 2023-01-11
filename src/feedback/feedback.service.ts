import { Feedback } from './entities/feedback.entity';
import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Hotel } from 'src/hotels/entities/hotel.entity';

@Injectable()
export class FeedbackService {
  async create(createFeedbackDto: CreateFeedbackDto) {
    try {
      await getRepository(Feedback)
        .createQueryBuilder('feedback')
        .insert()
        .values(createFeedbackDto)
        .execute();
      return {
        statusCode: HttpStatus.CREATED,
        message: `Send Feedback Successfully !`,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Send Feedback Fail !`,
      };
    }
  }
  async getAll() {
    try {
      return await getRepository(Feedback)
        .createQueryBuilder('feedback')
        .getMany();
    } catch (error) {}
  }
  async findAll() {
    try {
      const hotels = await getRepository(Feedback)
        .createQueryBuilder('feedback')
        .innerJoinAndMapOne(
          'feedback.hotels',
          Hotel,
          'hotels',
          'hotels.id = feedback.hotelId',
        )
        .getMany();
      const feedbacks = await getRepository(Feedback)
        .createQueryBuilder('feedback')
        .leftJoinAndSelect(
          'feedback.account',
          'account',
          'account.id = feedback.accountId',
        )
        .leftJoinAndMapOne(
          'feedback.hotel',
          Hotel,
          'hotel',
          'hotel.id = feedback.hotelId',
        )
        .getMany();

      return {
        hotels,
        feedbacks,
      };
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
