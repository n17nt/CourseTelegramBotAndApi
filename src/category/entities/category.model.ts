import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class CategoryModel {
  @Field(() => ID, { description: 'Unique identifier for the category' })
  id: number;

  @Field(() => String, { description: 'Name of the category' })
  categoryName: string;

  @Field(() => String, { description: 'Description of the category' })
  description: string;

  //   @Field(() => [CourseModel], {
  //     description: 'Courses under this category',
  //   })
  //   courses?: CourseModel[];
}
