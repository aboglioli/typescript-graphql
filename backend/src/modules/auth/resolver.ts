import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import { IUser, UserModel } from '../../models';
import Auth from '../auth/schema';
import User from '../user/schema';
import { generateAuthToken } from '../../utils/user';

interface IAuth {
  token: string;
  user: IUser;
}

@InputType()
class SignupInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  email: string;
}

@Resolver(() => Auth)
export default class AuthResolver {
  @Query(() => User)
  profile(@Ctx('userId') userId: string) {
    if (!userId) {
      throw new Error('UNAUTHORIZED');
    }

    return UserModel.findById(userId);
  }

  @Mutation(() => Auth)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
  ) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const validPassword = await user.verifyPassword(password);
    if (!validPassword) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const token = generateAuthToken(user.id);

    return { token, user };
  }

  @Mutation(() => User)
  async signup(@Arg('data') data: SignupInput) {
    const existingUser = await UserModel.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });
    if (existingUser) {
      throw new Error('EXISTING_USER');
    }

    return UserModel.create(data);
  }

  @FieldResolver()
  user(@Root() auth: IAuth) {
    return UserModel.findById(auth.user.id);
  }
}
