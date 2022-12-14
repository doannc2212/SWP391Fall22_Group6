import { Module } from '@nestjs/common';
import { ExaminationService } from './examination.service';
import { ExaminationController } from './examination.controller';

@Module({
  providers: [ExaminationService],
  controllers: [ExaminationController],
})
export class ExaminationModule {}
