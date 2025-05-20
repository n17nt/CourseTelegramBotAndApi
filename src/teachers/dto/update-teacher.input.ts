import { CreateTeacherInput } from './create-teacher.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeacherInput extends PartialType(CreateTeacherInput) {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // id?: number;
  // @Field(() => String, { description: "ismi" })
  // name?: string;
  // @Field(() => String, { description: "email" })
  // email?: string;
  // @Field(() => String, { description: "phone number" })
  // phoneNumber?: string;
  // @Field(() => String, { description: 'necha yillik malakasi bor' })
  // experience?: number;
  // @Field(() => String, { description: 'diplommi' })
  // diploma?: string;
}

