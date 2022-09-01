import { Recommend } from './../../recommend/entities/recommend.entity';
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
  @ManyToOne(() => Hotel, (hotel) => hotel.spas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: Hotel;
  @OneToMany(() => Treatment, (treatment) => treatment.spa, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  treatments: Treatment[];
  @OneToMany(() => Recommend, (recommend) => recommend.spa, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  recommends: [];
  @OneToMany(() => Image, (image) => image.spa, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: Image[];
}
