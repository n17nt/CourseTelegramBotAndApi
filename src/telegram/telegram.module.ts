import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplyService } from './apply.service';
import { ApplyEntity } from './apply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplyEntity])],
  providers: [TelegramService, ApplyService],
})
export class TelegramModule {}
