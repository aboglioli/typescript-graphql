import { Field, ID, Int, ObjectType } from 'type-graphql';

import User from './user';

@ObjectType()
export default class Project {
  @Field(() => ID)
  public id: string;

  @Field()
  public name: string;

  @Field(() => Int)
  public priority: number;

  @Field()
  public completed: boolean;

  @Field(() => User)
  public user: User;
}
