import { Dish } from 'src/dishes/entities/dish.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Treatment } from 'src/treatments/entities/treatment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  restaurant_name: string;
  @Column()
  restaurant_description: string;
  @ManyToOne(() => Hotel, (hotel) => hotel.restaurants)
  hotel: Hotel;
  @OneToMany(() => Dish, (dish) => dish.restaurant)
  dishs: Dish[];
}
