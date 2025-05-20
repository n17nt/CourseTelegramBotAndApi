import { Course } from 'src/courses/entities/course.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Nomsiz Categoriya' })
  categoryName: string;

  @Column({ default: 'Bizni categoriya haqida malumot yoq' })
  description: string;
  @ManyToOne(() => Course)
  courses: Course[];
  // @OneToMany(() => Course, (course) => course.category)
  // courses: Course[];
}
