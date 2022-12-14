import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateExaminationStatusInput {
  @Field({ nullable: true })
  name?: string;
}
