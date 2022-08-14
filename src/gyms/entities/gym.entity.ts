import { Workout } from './../../workouts/entities/workout.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Image } from 'src/image/entities/image.entity';
@Entity()
export class Gym {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  gym_name: string;
  @Column()
  gym_description: string;
  @ManyToOne(() => Hotel, (hotel) => hotel.gyms)
  hotel: Hotel;
  @OneToMany(() => Workout, (workout) => workout.gym)
  workouts: Workout[];
  @OneToMany(() => Image, (image) => image.gym)
  images: string[];
}
