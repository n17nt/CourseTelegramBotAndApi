import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateApplicationInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
  @Field()
  address: string;
  @Field()
  phone: string;
}
