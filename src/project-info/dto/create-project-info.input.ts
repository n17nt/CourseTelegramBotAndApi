import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateProjectInfoInput {
  @Field()
  fullname: string;

  @Field()
  phone: string;

  @Field()
  courseName: string;
}
