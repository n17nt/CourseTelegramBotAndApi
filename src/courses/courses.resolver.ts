import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { CourseModel } from './entities/course.model.';
import { CourseModelReturn } from './dto/return.data';

@Resolver(() => CourseModel)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Mutation(() => CourseModel)
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ) {
    return this.coursesService.create(createCourseInput);
  }

  @Query(() => [CourseModel], { name: 'courses' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Query(() => CourseModel, { name: 'course' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.findOne(id);
  }

  @Mutation(() => CourseModel)
  updateCourse(
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
    @Args('id') id: number,
  ) {
    return this.coursesService.update(id, updateCourseInput);
  }

  @Mutation(() => CourseModel)
  removeCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.remove(id);
  }
}
