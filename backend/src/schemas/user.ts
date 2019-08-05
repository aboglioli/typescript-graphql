import { Field, ID, ObjectType } from 'type-graphql';

import Project from './project';

@ObjectType()
export default class User {
  @Field(() => ID)
  public id: string;

  @Field()
  public username: string;

  @Field()
  public name: string;

  @Field(() => [Project])
  public projects: Project[];
}
