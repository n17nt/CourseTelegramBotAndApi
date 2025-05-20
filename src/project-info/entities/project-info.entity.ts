import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ProjectInfo {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  fullname: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  courseName: string;
}
