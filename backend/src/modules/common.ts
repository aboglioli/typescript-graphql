import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ isAbstract: true })
export class Node {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
