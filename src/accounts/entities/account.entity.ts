import { Role } from 'src/roles/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  address: string;
  @Column()
  sex: string;
  @Column()
  password: string;
  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;
}
