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
export class Spa {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  spa_name: string;
  @Column()
  spa_description: string;
  @ManyToOne(() => Hotel, (hotel) => hotel.spas)
  hotel: Hotel;
  @OneToMany(() => Treatment, (treatment) => treatment.spa)
  treatments: Treatment[];
  @OneToMany(() => Image, (image) => image.spa)
  images: Image[];
}
