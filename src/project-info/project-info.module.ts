import { Module } from '@nestjs/common';
import { ProjectInfoService } from './project-info.service';
import { ProjectInfoResolver } from './project-info.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectInfo } from './entities/project-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectInfo])],
  providers: [ProjectInfoResolver, ProjectInfoService],
  exports: [ProjectInfoService]
})
export class ProjectInfoModule {}
