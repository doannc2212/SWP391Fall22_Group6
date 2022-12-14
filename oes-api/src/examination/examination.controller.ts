import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Examination } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SearchInput } from 'src/common/models/search-input.model';
import { CreateExaminationInput } from './dto/create-examination-input';
import { UpdateExaminationStatusInput } from './dto/update-examinationStatus-input';
import { ExaminationService } from './examination.service';

@Controller('examination')
@UseGuards(JwtAuthGuard)
export class ExaminationController {
  constructor(private examinationService: ExaminationService) {}

  @Get()
  async getExamination(@Req() req: Request): Promise<Examination> {
    const id = req.query.id as string;
    return this.examinationService.getExamination(id);
  }

  @Put()
  async updateExamination(@Body() data: UpdateExaminationStatusInput & { id: string }) {
    const { id, ...newExaminationData } = data;
    return this.examinationService.updateExamination(id, newExaminationData);
  }

  @Patch()
  async updateMultipleExamination(
    @Body() data: UpdateExaminationStatusInput & { ids: string[] }
  ) {
    const { ids, ...newExaminationData } = data;
    return this.examinationService.updateMultipleExamination(ids, newExaminationData);
  }

  @Delete()
  async deleteExamination(@Req() req: Request): Promise<Examination> {
    const id = req.query.id as string;
    return this.examinationService.deleteExamination(id);
  }

  @Post('search')
  async searchExamination(@Body() data: SearchInput): Promise<Examination[]> {
    return this.examinationService.searchExamination(data);
  }

  @Post()
  async createExamination(@Body() data: CreateExaminationInput): Promise<Examination> {
    return this.examinationService.createExamination(data);

  }
}
