import { ObjectType, Field, Int } from 'type-graphql';
import User from './user';

@ObjectType()
export default class Project {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field(type => Int)
    priority: number;

    @Field()
    completed: boolean;

    @Field(type => User)
    user: User;
}
