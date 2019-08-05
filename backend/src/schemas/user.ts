import { ObjectType, Field } from 'type-graphql';
import Project from './project';

@ObjectType()
export default class User {
    @Field()
    id: string;

    @Field()
    username: string;

    @Field()
    name: string;

    @Field(type => [Project])
    projects: Project[];
}
