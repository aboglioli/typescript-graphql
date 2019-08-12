import { Resolver } from 'type-graphql';

import User from '../user/schema';

@Resolver(() => User)
export default class UserResolver {}
