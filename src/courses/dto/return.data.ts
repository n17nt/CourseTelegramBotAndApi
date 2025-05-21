import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CategoryModel } from 'src/category/entities/category.model';

@ObjectType()
export class CourseModelReturn {
  @Field(() => Int, { description: 'Unique identifier for the course' })
  id: number;

  @Field(() => String, { description: 'Name of the course' })
  courseName: string;

  @Field(() => String, { description: 'Description of the course' })
  courseDescription: string;

  @Field(() => String, { description: 'Duration of the course' })
  duration: string;

  @Field(() => Float, { description: 'Price of the course' })
  price: number;

  @Field(() => CategoryModel, {
    description: 'Categories this course belongs to',
  })
  category: CategoryModel;
}
