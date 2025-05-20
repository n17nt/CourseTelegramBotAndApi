import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplicationInput } from './dto/create-application.input';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepo: Repository<Application>,
  ) {}
  async create(createApplicationInput: CreateApplicationInput) {
    const data = await this.applicationRepo.create(createApplicationInput);
    return this.applicationRepo.save(data);
  }

  async findAll() {
    return await this.applicationRepo.find();
  }
}
