import { FieldResolver, Resolver, Root } from 'type-graphql';

import {
  Project as ProjectModel,
  projects,
  User as UserModel,
} from '../../data';
import User from '../user/schema';

@Resolver(() => User)
export default class UserResolver {
  @FieldResolver()
  projects(@Root() user: UserModel): ProjectModel[] {
    return projects.filter(p => p.userId === user.id);
  }
}
