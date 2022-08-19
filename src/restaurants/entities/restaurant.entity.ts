import { Dish } from 'src/dishes/entities/dish.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Image } from 'src/image/entities/image.entity';
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
  @ManyToOne(() => Hotel, (hotel) => hotel.restaurants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: Hotel;
  @OneToMany(() => Dish, (dish) => dish.restaurant, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  dishs: Dish[];
  @OneToMany(() => Image, (image) => image.restaurant, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: string[];
}
