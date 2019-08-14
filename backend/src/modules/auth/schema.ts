import { Field, ObjectType } from 'type-graphql';

import UserType from '../user/schema';

@ObjectType()
export default class AuthType {
  @Field()
  token: string;

  @Field(() => UserType)
  user: UserType;
}
