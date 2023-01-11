import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Gym } from './../../gyms/entities/gym.entity';
import { Dish } from './../../dishes/entities/dish.entity';
import { Treatment } from 'src/treatments/entities/treatment.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Workout } from 'src/workouts/entities/workout.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Spa } from 'src/spas/entities/spa.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  time: string;
  @Column()
  type: string;
  @ManyToOne(() => Hotel, (hotel) => hotel.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: number;
  @ManyToOne(() => Spa, (spa) => spa.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  treatment: number;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  dish: number;
  @ManyToOne(() => Gym, (gym) => gym.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  workout: number;
  @ManyToOne(() => Account, (account) => account.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  account: number;
}
