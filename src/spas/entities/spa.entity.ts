import { Hotel } from 'src/hotels/entities/hotel.entity';
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
  hotel_name: string;
  @Column()
  hotel_description: string;
  @ManyToOne(() => Hotel, (hotel) => hotel.spas)
  hotel: Hotel;
  @OneToMany(() => Treatment, (treatment) => treatment.spa)
  treatments: Treatment[];
}
