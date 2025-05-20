import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersResolver } from './teachers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModel } from './entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherModel])],
  providers: [TeachersResolver, TeachersService],
})
export class TeachersModule {}
