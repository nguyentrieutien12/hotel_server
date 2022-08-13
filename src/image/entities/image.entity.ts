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
  @OneToOne(() => Account)
  account: Account;
}
