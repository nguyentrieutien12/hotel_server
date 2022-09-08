import { Account } from 'src/accounts/entities/account.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  feedback: string;
  @Column()
  rate: number;
  @ManyToOne(() => Account, (account) => account.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  account: number;
}
