import { Field, ObjectType } from 'type-graphql';

import { Node } from '../common';

@ObjectType()
export default class User extends Node {
  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
