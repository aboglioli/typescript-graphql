import { Field, ID, ObjectType } from 'type-graphql';

import Project from '../project/schema';

@ObjectType()
export default class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  name: string;

  @Field(() => [Project])
  projects: Project[];
}
