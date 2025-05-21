import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, default: 'Nomsiz Kurs' })
  courseName: string;
  @Column({ nullable: true, default: 'Bizni kurs haqida malumot yoq' })
  courseDescription: string;
  @Column({ nullable: true, default: 0 })
  duration: string;
  @Column({ nullable: true, default: 0 })
  price: number;
  @ManyToOne(() => Category, (category) => category.courses, { nullable: true })
  @JoinColumn()
  category: Category;
  // @OneToMany(() => Teacher, (teacher) => teacher.course)
  // teachers: Teacher[];
}
