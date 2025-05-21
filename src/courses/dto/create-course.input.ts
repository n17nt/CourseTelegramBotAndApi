import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field(() => String, { description: 'Name of the course' })
  courseName: string;

  @Field(() => String, { description: 'Description of the course' })
  courseDescription: string;

  @Field(() => String, { description: 'Duration of the course' })
  duration: string;

  @Field(() => Float, { description: 'Price of the course' })
  price: number;
  @Field(() => Int, { description: 'Price of the course' })
  category_id: number;
}
