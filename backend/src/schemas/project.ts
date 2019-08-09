import { Field, ID, Int, ObjectType } from 'type-graphql';

import User from './user';

@ObjectType()
export default class Project {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  priority: number;

  @Field()
  completed: boolean;

  @Field(() => User)
  user: User;
}
