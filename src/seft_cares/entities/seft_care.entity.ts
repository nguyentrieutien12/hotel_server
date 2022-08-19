import { Hotel } from 'src/hotels/entities/hotel.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity()
export class SeftCare {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  seftcare_name: string;
  @Column()
  seftcare_description: string;
  @Column()
  seftcare_price: number;
  @ManyToOne(() => Hotel, (hotel) => hotel.seftcares, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: Hotel;
  //   @OneToMany(() => Treatment, (treatment) => treatment.spa)
  //   treatments: Treatment[];
}
