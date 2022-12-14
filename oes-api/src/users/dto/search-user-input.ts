import { Field, InputType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { SearchInput } from 'src/common/models/search-input.model';

@InputType()
export class SearchUserInput extends SearchInput {
  @Field({ defaultValue: 'firstname', nullable: true })
  keyword?: 'firstname' | 'lastname';
  @Field({ nullable: true })
  role?: Role;
  @Field(() => [String], { nullable: true })
  subject?: string[];
  @Field(() => [String], { nullable: true })
  examination?: string[];
}
