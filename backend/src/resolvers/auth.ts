import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { Auth as AuthModel, User as UserModel, users } from '../data';
import Auth from '../schemas/auth';
import User from '../schemas/user';
import { generateAuthToken } from '../utils';

@Resolver(() => Auth)
export default class AuthResolver {
  @Query(() => User)
  profile(@Ctx('userId') userId: string): UserModel | undefined {
    if (!userId) {
      throw new Error('Not logged in');
    }

    return users.find(u => u.id === userId);
  }

  @Mutation(() => Auth)
  login(
    @Arg('username') username: string,
    @Arg('password') password: string,
  ): AuthModel {
    const user = users.find(u => u.username === username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const correct = password === user.password;
    if (!correct) {
      throw new Error('Invalid credentials');
    }

    const token = generateAuthToken(user.id);

    return { token, user };
  }

  @FieldResolver()
  user(@Root() auth: AuthModel) {
    return users.find(u => u.id === auth.user.id);
  }
}
