import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';

import { users, projects, IUser } from '../data';
import User from '../schemas/user';

@Resolver(of => User)
export default class {
    @Query(returns => [User])
    users() {
        return users;
    }

    @Query(returns => User, { nullable: true })
    user(@Arg('id') id: string) {
        return users.find(u => u.id === id);
    }

    @FieldResolver()
    projects(@Root() user: IUser) {
        return projects.filter(p => p.userId === user.id);
    }
}
