import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recovery {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  recovery_name: string;
}
