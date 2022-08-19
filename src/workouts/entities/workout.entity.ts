import { Gym } from 'src/gyms/entities/gym.entity';
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
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  workout_name: string;
  @Column()
  workout_description: string;
  @Column()
  workout_price: number;
  @ManyToOne(() => Gym, (gym) => gym.workouts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  gym: Gym[];
  @OneToMany(() => Image, (image) => image.workout, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: string[];
  //   @OneToMany(() => Treatment, (treatment) => treatment.spa)
  //   treatments: Treatment[];
}
