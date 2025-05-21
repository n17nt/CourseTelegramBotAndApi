import { Injectable } from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    private categoryService: CategoryService,
  ) {}
  async create(createCourseInput: CreateCourseInput) {
    const category = await this.categoryService.findOne(
      createCourseInput.category_id,
    );
    console.log(category);

    const cat = this.courseRepo.create(createCourseInput);
    cat.category = category;
    return await this.courseRepo.save(cat);
  }

  async findAll() {
    const data = await this.courseRepo.find();
    console.log(data);

    return data;
  }

  async findOne(id: number) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    console.log(course);

    return course;
  }

  update(id: number, updateCourseInput: UpdateCourseInput) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
