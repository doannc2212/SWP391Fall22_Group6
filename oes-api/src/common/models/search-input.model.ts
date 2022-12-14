import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SearchInput {
  @Field(() => Int, { defaultValue: 1, nullable: true })
  pageNum?: number;
  @Field(() => Int, { defaultValue: 10, nullable: true })
  pageSize?: number;
  @Field({ nullable: true })
  keyword?: string;
  @Field({ defaultValue: 'name', nullable: true })
  orderBy?: string;
  @Field({ defaultValue: 'asc', nullable: true })
  sort?: 'asc' | 'desc';
}
