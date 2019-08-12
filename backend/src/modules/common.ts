import { Field, ObjectType } from 'type-graphql';

@ObjectType({ isAbstract: true })
export class Timestamp {
  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
