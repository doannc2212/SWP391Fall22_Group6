import { Field, InputType } from '@nestjs/graphql';
import { SearchInput } from 'src/common/models/search-input.model';

@InputType()
export class SearchSubjectInput extends SearchInput {
  @Field({ defaultValue: 'name', nullable: true })
  orderBy?: 'name' | 'code';
}
