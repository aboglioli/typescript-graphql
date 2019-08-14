import { Field, ObjectType } from 'type-graphql';

import { Node } from '../common';

@ObjectType()
export default class UserType extends Node {
  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
