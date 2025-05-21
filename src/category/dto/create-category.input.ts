import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'Name of the category' })
  categoryName: string;

  @Field(() => String, { description: 'Description of the category' })
  description: string;

  // Agar kurslar id orqali biriktirilsa, shunday yoziladi:
  @Field(() => [Number], {
    nullable: true,
    description: 'IDs of the courses under this category',
  })
  courseIds?: number[];
}
