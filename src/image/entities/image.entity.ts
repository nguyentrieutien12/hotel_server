import { BodyRecovery } from './../../body_recovery/entities/body_recovery.entity';
import { Dish } from './../../dishes/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Treatment } from 'src/treatments/entities/treatment.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Spa } from 'src/spas/entities/spa.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Gym } from 'src/gyms/entities/gym.entity';
import { Workout } from 'src/workouts/entities/workout.entity';
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image_url: string;
  @ManyToOne(() => Hotel, (hotel) => hotel.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: number;
  @ManyToOne(() => Spa, (spa) => spa.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  spa: number;
  @ManyToOne(() => Treatment, (treatment) => treatment.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  treatment: number;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant: number;
  @ManyToOne(() => Dish, (dish) => dish.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  dish: number;
  @ManyToOne(() => Gym, (gym) => gym.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  gym: number;
  @ManyToOne(() => Workout, (workout) => workout.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  workout: number;
  @ManyToOne(() => BodyRecovery, (bodyRecovery) => bodyRecovery.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  body_recovery: number;
  @OneToOne(() => Account)
  account: Account;
}
