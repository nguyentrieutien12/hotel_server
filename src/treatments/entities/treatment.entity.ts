import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Image } from 'src/image/entities/image.entity';
import { Spa } from 'src/spas/entities/spa.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  treatment_name: string;
  @Column()
  treatment_description: string;
  @Column()
  treatment_price: number;
  @ManyToOne(() => Spa, (spa) => spa.treatments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  spa: Spa;
  @OneToMany(() => Image, (image) => image.treatment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: string[];
}
