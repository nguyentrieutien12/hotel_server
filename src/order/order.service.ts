import { Restaurant } from './../restaurants/entities/restaurant.entity';
import { getRepository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Spa } from 'src/spas/entities/spa.entity';
import { Gym } from 'src/gyms/entities/gym.entity';

@Injectable()
export class OrderService {
  async createRestaurant(createOrderDto: any) {
    const { type, hotelId, restaurantId, time, account } = createOrderDto;
    try {
      await getRepository(Order)
        .createQueryBuilder('order')
        .insert()
        .values({
          type,
          hotel: parseInt(hotelId),
          dish: parseInt(restaurantId),
          time,
          account,
        })
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
    const { type, hotelId, gymId, time, account } = createOrderDto;
    try {
      await getRepository(Order)
        .createQueryBuilder('order')
        .insert()
        .values({
          type,
          hotel: parseInt(hotelId),
          workout: parseInt(gymId),
          time,
          account,
        })
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
    const { type, hotelId, spaId, time, account } = createOrderDto;
    try {
      await getRepository(Order)
        .createQueryBuilder('order')
        .insert()
        .values({ type, hotel: hotelId, treatment: spaId, time, account })
        .execute();
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Order Spa Successfully !',
      };
    } catch (error) {
      console.log(error);
    }
  }
  async findAll() {
    try {
      return await getRepository(Order).createQueryBuilder('order').getMany();
    } catch (error) {}
  }
  async findTop() {
    try {
      return await getRepository(Order)
        .createQueryBuilder()
        .select('count(order.hotelId)')
        .groupBy('hotelId')
        .getMany();
    } catch (error) {
      console.log(error);
    }
  }
  async findOne() {
    try {
      const hotels = await getRepository(Order)
        .createQueryBuilder('order')
        .innerJoinAndMapOne(
          'order.hotels',
          Hotel,
          'hotels',
          'hotels.id = order.hotelId',
        )
        .groupBy('order.hotelId')
        .getMany();
      const restaurant = await getRepository(Order)
        .createQueryBuilder('order')
        .innerJoinAndMapOne(
          'order.restaurant',
          Restaurant,
          'restaurant',
          'restaurant.id = order.dishId',
        )
        .innerJoinAndMapOne(
          'order.account',
          Account,
          'account',
          'account.id = order.accountId',
        )
        .innerJoinAndMapOne(
          'order.hotel',
          Hotel,
          'hotel',
          'hotel.id = order.hotelId',
        )
        .getMany();
      const spa = await getRepository(Order)
        .createQueryBuilder('order')
        .innerJoinAndMapOne(
          'order.spa',
          Spa,
          'spa',
          'spa.id = order.treatmentId',
        )
        .innerJoinAndMapOne(
          'order.account',
          Account,
          'account',
          'account.id = order.accountId',
        )
        .innerJoinAndMapOne(
          'order.hotel',
          Hotel,
          'hotel',
          'hotel.id = order.hotelId',
        )
        .getMany();
      const gym = await getRepository(Order)
        .createQueryBuilder('order')
        .innerJoinAndMapOne('order.gym', Gym, 'gym', 'gym.id = order.workoutId')
        .innerJoinAndMapOne(
          'order.account',
          Account,
          'account',
          'account.id = order.accountId',
        )
        .innerJoinAndMapOne(
          'order.hotel',
          Hotel,
          'hotel',
          'hotel.id = order.hotelId',
        )
        .getMany();
      return {
        spa,
        gym,
        restaurant,
        hotels,
      };
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
