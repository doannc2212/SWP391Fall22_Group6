import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Subject } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateSubjectInput } from './dto/update-subject-input';
import { SubjectService } from './subject.service';

@Controller('subject')
@UseGuards(JwtAuthGuard)
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  async getSubject(@Req() req: Request): Promise<Subject> {
    const id = req.query.id as string;
    return this.subjectService.getSubject(id);
  }

  @Put()
  async updateSubject(@Body() data: UpdateSubjectInput & { id: string }) {
    const { id, ...newSubjectData } = data;
    return this.subjectService.updateSubject(id, newSubjectData);
  }

  @Patch()
  async updateMultipleSubject(
    @Body() data: UpdateSubjectInput & { ids: string[] }
  ) {
    const { ids, ...newSubjectData } = data;
    return this.subjectService.updateMultipleSubject(ids, newSubjectData);
  }

  @Delete()
  async deleteSubject(@Req() req: Request): Promise<Subject> {
    const id = req.query.id as string;
    return this.subjectService.deleteSubject(id);
  }
}
