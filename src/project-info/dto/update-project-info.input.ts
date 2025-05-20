import { CreateProjectInfoInput } from './create-project-info.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInfoInput extends PartialType(CreateProjectInfoInput) {
  @Field(() => Int)
  id: number;
}
