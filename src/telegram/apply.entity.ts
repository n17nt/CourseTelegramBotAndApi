import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApplyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  course: string;
}
