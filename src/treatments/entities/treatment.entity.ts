import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Spa } from 'src/spas/entities/spa.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  treament_name: string;
  @Column()
  treament_description: string;
  @Column()
  treament_price: number;
  @ManyToOne(() => Spa, (spa) => spa.treatments)
  spa: Spa;
}
