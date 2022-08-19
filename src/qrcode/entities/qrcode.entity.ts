import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Account } from 'src/accounts/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Qrcode {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  qr_link: string;
  @OneToOne(() => Hotel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  hotel: Hotel;
}
