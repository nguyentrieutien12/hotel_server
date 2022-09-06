import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  async createRestaurant(createOrderDto: any) {
    const { hotelId, restaurantId, time, email } = createOrderDto;
    try {
      await getRepository(Order)
        .createQueryBuilder('order')
        .insert()
        .values({ hotel: hotelId, dish: restaurantId, time, email })
        .execute();
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Order Restaurant Successfully !',
      };
    } catch (error) {
      console.log(error);
    }
  }
  async createGym(createOrderDto: any) {
    const { hotelId, gymId, time, email } = createOrderDto;
    try {
      await getRepository(Order)
        .createQueryBuilder('order')
        .insert()
        .values({ hotel: hotelId, workout: gymId, time, email })
        .execute();
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Order Gym Successfully !',
      };
    } catch (error) {
      console.log(error);
    }
  }
  async createSpa(createOrderDto: any) {
    const { hotelId, SpaId, time, email } = createOrderDto;
    console.log(createOrderDto);
    try {
      await getRepository(Order)
        .createQueryBuilder('order')
        .insert()
        .values({ hotel: hotelId, treatment: SpaId, time, email })
        .execute();
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Order Spa Successfully !',
      };
    } catch (error) {
      console.log(error);
    }
  }
  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
