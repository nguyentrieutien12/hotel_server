import { Hotel } from './../../hotels/entities/hotel.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('json')
  quiz: { question: string; answer: string[] }[];
  @ManyToOne(() => Hotel, (hotel) => hotel.id)
  hotel: number;
}
