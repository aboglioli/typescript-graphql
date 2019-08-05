import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';

import { users, projects, IProject } from '../data';
import Project from '../schemas/project';

@Resolver(of => Project)
export default class {
    @Query(returns => [Project])
    projects() {
        return projects;
    }

    @Query(returns => Project, { nullable: true })
    projectById(@Arg('id') id: string): IProject | undefined {
        return projects.find(p => p.id === id);
    }

    @Mutation(returns => Project)
    markAsCompleted(@Arg('id') id: string) {
        const project = projects.find(p => p.id === id);

        if (!project) {
            return new Error('Project not found');
        }

        if (project.completed) {
            return new Error('Already completed');
        }

        project.completed = true;

        return project;
    }

    @FieldResolver()
    user(@Root() project: IProject) {
        return users.find(u => u.id === project.userId);
    }
}
