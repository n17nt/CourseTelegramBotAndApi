import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Teacher {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;
  @Field(() => String, { description: 'ismi' })
  name: string;
  @Field(() => String, { description: 'email' })
  email: string;
  @Field(() => String, { description: 'phone number' })
  phoneNumber: string;
  @Field(() => String, { description: 'necha yillik malakasi bor' })
  experience: number;
  @Field(() => String, { description: 'diplommi' })
  diploma: string;
}
