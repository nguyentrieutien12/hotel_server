import { Account } from 'src/accounts/entities/account.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
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
  @ManyToOne(() => Hotel, (hotel) => hotel.images)
  hotel: Hotel;
  @OneToOne(() => Account)
  account: Account;
}
