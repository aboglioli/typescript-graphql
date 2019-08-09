import {
  Arg,
  FieldResolver,
  InputType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { Auth as AuthModel, User as UserModel, users } from '../data';
import Auth from '../schemas/auth';
import User from '../schemas/user';

@InputType()
class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver(() => Auth)
export default class AuthResolver {
  @Query(() => User)
  profile(): UserModel {}

  @Mutation(() => Auth)
  login(): AuthModel {
    return users;
  }

  @Mutation(() => Auth)
  signup(): AuthModel {}
}
