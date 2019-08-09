import { Field, ObjectType } from 'type-graphql';

import User from '../user/schema';

@ObjectType()
export default class Auth {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
