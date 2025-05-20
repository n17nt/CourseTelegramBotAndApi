import { Injectable } from '@nestjs/common';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherModel } from './entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(TeacherModel)
    private teacherRepo: Repository<TeacherModel>,
  ) {}
  async create(createTeacherInput: CreateTeacherInput) {
    const teacher = await this.teacherRepo.create(createTeacherInput);
    return this.teacherRepo.save(teacher);
  }

  findAll() {
    return this.teacherRepo.find();
  }

  findOne(id: number) {
    return this.teacherRepo.findOne({ where: { id } });
  }

  async update(id: number, updateTeacherInput: UpdateTeacherInput) {
    const newTeacher = await this.teacherRepo.findOne({ where: { id } });
    Object.assign(newTeacher, updateTeacherInput);
    return this.teacherRepo.save(newTeacher);
  }

  remove(id: number) {
    return this.teacherRepo.delete(id);
  }
}
