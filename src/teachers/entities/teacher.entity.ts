import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeacherModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: false })
  experience: number;
  @Column({ nullable: true })
  diploma: string;
}
