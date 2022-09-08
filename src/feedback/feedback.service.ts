import { Feedback } from './entities/feedback.entity';
import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

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

  async findAll() {
    try {
      return await getRepository(Feedback)
        .createQueryBuilder('feedback')
        .leftJoinAndSelect(
          'feedback.account',
          'account',
          'account.id = feedback.accountId',
        )
        .getMany();
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
