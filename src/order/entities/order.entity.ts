import { Dish } from './../../dishes/entities/dish.entity';
import { Treatment } from 'src/treatments/entities/treatment.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Workout } from 'src/workouts/entities/workout.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Account } from 'src/accounts/entities/account.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  time: string;
  @ManyToOne(() => Hotel, (hotel) => hotel.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: number;
  @ManyToOne(() => Treatment, (treatment) => treatment.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  treatment: number;
  @ManyToOne(() => Dish, (dish) => dish.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  dish: number;
  @ManyToOne(() => Workout, (workout) => workout.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  workout: number;
  @ManyToOne(() => Account, (account) => account.email, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  email: any;
}
