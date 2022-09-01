import { Hotel } from './../../hotels/entities/hotel.entity';
import { BodyRecovery } from './../../body_recovery/entities/body_recovery.entity';
import { Gym } from './../../gyms/entities/gym.entity';
import { Restaurant } from './../../restaurants/entities/restaurant.entity';
import { Spa } from 'src/spas/entities/spa.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Recommend {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Spa, (spa) => spa.recommends, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  spa: number;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.recommends, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant: number;
  @ManyToOne(() => Gym, (gym) => gym.recommends, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  gym: number;
  @ManyToOne(() => BodyRecovery, (bodyRecovery) => bodyRecovery.recommends, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  body_recovery: number;
  @ManyToOne(() => Hotel, (hotel) => hotel.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: number;
  @Column()
  type: string;
}
