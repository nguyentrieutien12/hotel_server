import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Image } from 'src/image/entities/image.entity';
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
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.dishs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant: Restaurant;
  @OneToMany(() => Image, (image) => image.dish, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: string[];
  //   @OneToMany(() => Treatment, (treatment) => treatment.spa)
  //   treatments: Treatment[];
}
