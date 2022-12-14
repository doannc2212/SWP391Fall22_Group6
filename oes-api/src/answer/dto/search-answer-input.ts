import { Field, InputType } from '@nestjs/graphql';
import { SearchInput } from 'src/common/models/search-input.model';

@InputType()
export class SearchAnswerInput extends SearchInput {
  @Field({ defaultValue: 'content', nullable: true })
  orderBy?: 'content';
}
