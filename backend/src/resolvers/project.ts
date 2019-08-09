import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import {
  Project as ProjectModel,
  projects,
  User as UserModel,
  users,
} from '../data';
import Project from '../schemas/project';

@Resolver(() => Project)
export default class ProjectResolver {
  @Query(() => [Project])
  projects(): ProjectModel[] {
    return projects;
  }

  @Query(() => Project, { nullable: true })
  projectById(@Arg('id') id: string): ProjectModel | undefined {
    return projects.find(p => p.id === id);
  }

  @Mutation(() => Project)
  markAsCompleted(@Arg('id') id: string): ProjectModel {
    const project = projects.find(p => p.id === id);

    if (!project) {
      throw new Error('Project not found');
    }

    if (project.completed) {
      throw new Error('Already completed');
    }

    project.completed = true;

    return project;
  }

  @FieldResolver()
  user(@Root() project: ProjectModel): UserModel | undefined {
    return users.find(u => u.id === project.userId);
  }
}
