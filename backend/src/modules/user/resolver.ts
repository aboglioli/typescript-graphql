import { Resolver } from 'type-graphql';

import UserType from '../user/schema';

@Resolver(() => UserType)
export default class UserResolver {}
