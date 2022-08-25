import { BodyRecovery } from './../../body_recovery/entities/body_recovery.entity';
import { Restaurant } from './../../restaurants/entities/restaurant.entity';
import { Treatment } from './../../treatments/entities/treatment.entity';
import { Spa } from 'src/spas/entities/spa.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Dish } from 'src/dishes/entities/dish.entity';
import { Gym } from 'src/gyms/entities/gym.entity';
import { SeftCare } from 'src/seft_cares/entities/seft_care.entity';
import { Image } from 'src/image/entities/image.entity';
import { Qrcode } from 'src/qrcode/entities/qrcode.entity';
@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  video_url: string;
  @OneToOne(() => BodyRecovery, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  body_recovery: number;
}
