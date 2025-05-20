import { Injectable } from '@nestjs/common';
import { CreateProjectInfoInput } from './dto/create-project-info.input';
import { UpdateProjectInfoInput } from './dto/update-project-info.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectInfo } from './entities/project-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectInfoService {

  constructor(
    @InjectRepository(ProjectInfo)
    private readonly projectInfoRepo: Repository<ProjectInfo>
  ){}

  create(data: CreateProjectInfoInput) {

    const newInfo = this.projectInfoRepo.create(data)

    return this.projectInfoRepo.save(newInfo);
  }

  findAll() {
    return this.projectInfoRepo.find();
  }

}
