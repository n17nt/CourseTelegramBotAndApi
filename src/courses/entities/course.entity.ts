import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  // @OneToMany(() => Category, (category) => category.courses)
  // categories: Category[];
  // @OneToMany(() => Teacher, (teacher) => teacher.course)
  // teachers: Teacher[];
}
