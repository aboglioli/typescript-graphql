import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';

import {
  User as UserData,
  projects,
  users,
  Project as ProjectData,
} from '../data';
import User from '../schemas/user';

@Resolver(() => User)
export default class UserResolver {
  @Query(() => [User])
  public users(): UserData[] {
    return users;
  }

  @Query(() => User, { nullable: true })
  public user(@Arg('id') id: string): UserData | undefined {
    return users.find(u => u.id === id);
  }

  @FieldResolver()
  public projects(@Root() user: UserData): ProjectData[] {
    return projects.filter(p => p.userId === user.id);
  }
}
