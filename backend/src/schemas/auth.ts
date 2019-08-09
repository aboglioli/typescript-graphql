import { Field, ObjectType } from 'type-graphql';

import User from './user';

@ObjectType()
export default class Auth {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
