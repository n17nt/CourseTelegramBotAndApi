import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TeacherModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:false})
  name: string;
  @Column({nullable:false})
  email: string;
  @Column({nullable:false})
  phoneNumber: string;
  @Column({nullable:false})
  experience: number;
  @Column({nullable:false})
  diploma: string;
}
