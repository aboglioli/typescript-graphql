import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';

import {
  Project as ProjectModel,
  projects,
  User as UserModel,
  users,
} from '../data';
import User from '../schemas/user';

@Resolver(() => User)
export default class UserResolver {
  @Query(() => [User])
  users(): UserModel[] {
    return users;
  }

  @Query(() => User, { nullable: true })
  userById(@Arg('id') id: string): UserModel | undefined {
    return users.find(u => u.id === id);
  }

  @FieldResolver()
  projects(@Root() user: UserModel): ProjectModel[] {
    return projects.filter(p => p.userId === user.id);
  }
}
