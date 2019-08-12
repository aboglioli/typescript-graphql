import { Field, ID, ObjectType } from 'type-graphql';

import { Timestamp } from '../common';

@ObjectType()
export default class User extends Timestamp {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
