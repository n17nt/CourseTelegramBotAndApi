import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import { CreateApplicationInput } from './dto/create-application.input';
import { Application } from './entities/application.entity';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private readonly applicationService: ApplicationService) {}

  @Mutation(() => Application,({ name: 'createApplication'}))
  createApplication(
    @Args('createApplicationInput')
    createApplicationInput: CreateApplicationInput,
  ) {
    return this.applicationService.create(createApplicationInput);
  }

  @Query(() => [Application], { name: 'application' })
  findAll() {
    return this.applicationService.findAll();
  }
}
