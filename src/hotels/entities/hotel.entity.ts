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
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  hotel_name: string;
  @Column()
  hotel_email: string;
  @Column()
  hotel_address: string;
  @OneToMany(() => Spa, (spa) => spa.hotel)
  spas: Spa[];
  @OneToMany(() => Restaurant, (restaurant) => restaurant.hotel)
  restaurants: Restaurant[];
  @OneToMany(() => Gym, (gym) => gym.hotel)
  gyms: Gym[];
  @OneToMany(() => SeftCare, (seftcare) => seftcare.hotel)
  seftcares: SeftCare[];
  @OneToMany(() => Image, (image) => image.hotel)
  images: Image[];
  @OneToOne(() => Qrcode)
  @JoinColumn()
  qrcode: Qrcode;
}
