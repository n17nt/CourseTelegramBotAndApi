import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplyEntity } from './apply.entity';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [TypeOrmModule.forFeature([ApplyEntity]), ApplicationModule],
  providers: [TelegramService],
})
export class TelegramModule {}
