import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ProjectInfo } from 'src/project-info/entities/project-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectInfoService } from 'src/project-info/project-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectInfo])],
  providers: [TelegramService, ProjectInfoService],
})
export class TelegramModule {}
