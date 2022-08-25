import { Recovery } from './../../recovery/entities/recovery.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Image } from 'src/image/entities/image.entity';
@Entity()
export class BodyRecovery {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  body_recovery_name: string;
  @Column()
  body_recovery_description: string;
  @OneToMany(() => Image, (image) => image.hotel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: Image[];
  @OneToOne(() => Recovery, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  recovery: number;
}
