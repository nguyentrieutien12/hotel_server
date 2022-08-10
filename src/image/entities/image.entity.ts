import { Account } from 'src/accounts/entities/account.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Spa } from 'src/spas/entities/spa.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image_url: string;
  @ManyToOne(() => Hotel, (hotel) => hotel.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel: number;
  @ManyToOne(() => Spa, (spa) => spa.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  spa: number;
  @OneToOne(() => Account)
  account: Account;
}
