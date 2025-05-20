import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectInfoService } from './project-info.service';
import { ProjectInfo } from './entities/project-info.entity';
import { CreateProjectInfoInput } from './dto/create-project-info.input';

@Resolver(() => ProjectInfo)
export class ProjectInfoResolver {
  constructor(private readonly projectInfoService: ProjectInfoService) {}

  @Mutation(() => ProjectInfo)
  createProjectInfo(
    @Args('createProjectInfoInput')
    createProjectInfoInput: CreateProjectInfoInput,
  ): Promise<ProjectInfo> {
    return this.projectInfoService.create(createProjectInfoInput);
  }

  @Query(() => [ProjectInfo], { name: 'projectInfo' })
  findAll() {
    return this.projectInfoService.findAll();
  }
}
