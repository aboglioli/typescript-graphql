import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';

import {
  Project as ProjectData,
  User as UserData,
  projects,
  users,
} from '../data';
import Project from '../schemas/project';

@Resolver(() => Project)
export default class ProjectResolver {
  @Query(() => [Project])
  public projects(): ProjectData[] {
    return projects;
  }

  @Query(() => Project, { nullable: true })
  public projectById(@Arg('id') id: string): ProjectData | undefined {
    return projects.find(p => p.id === id);
  }

  @Mutation(() => Project)
  public markAsCompleted(@Arg('id') id: string): ProjectData {
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
  public user(@Root() project: ProjectData): UserData | undefined {
    return users.find(u => u.id === project.userId);
  }
}
