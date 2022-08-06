import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Treatment } from 'src/treatments/entities/treatment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  dishe_name: string;
  @Column()
  dishe_description: string;
  @Column()
  dishe_price: number;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.dishs)
  restaurant: Restaurant;
  //   @OneToMany(() => Treatment, (treatment) => treatment.spa)
  //   treatments: Treatment[];
}
