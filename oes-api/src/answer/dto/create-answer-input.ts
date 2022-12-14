import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field({ nullable: true })
  content: string;

  @Field(() => Boolean, { nullable: true })
  isCorrect: boolean;
}
