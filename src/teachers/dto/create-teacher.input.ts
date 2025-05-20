import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTeacherInput {
  @Field(() => String, { description: 'ismi', nullable: false })
  name?: string;
  @Field(() => String, { description: 'email', nullable: true })
  email?: string;
  @Field(() => String, { description: 'phone number', nullable: true })
  phoneNumber?: string;
  @Field(() => String, { description: 'necha yillik malakasi bor' })
  experience: number;
  @Field(() => String, { description: 'diplommi', nullable: true })
  diploma?: string;
}
