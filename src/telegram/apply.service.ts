import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ApplyEntity } from './apply.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface IApplication {
  name: string;
  phone: string;
  course: string;
}

@Injectable()
export class ApplyService {
  constructor(
    @InjectRepository(ApplyEntity)
    private applyRepo: Repository<ApplyEntity>,
  ) {}

  async saveApplication(applicationData: IApplication) {
    const application = this.applyRepo.create(applicationData);

    await this.applyRepo.save(application);

    return application;
  }
  hello() {
    // const application = this.applyRepo.create(applicationData);

    // await this.applyRepo.save(application);

    return 'application';
  }
}
