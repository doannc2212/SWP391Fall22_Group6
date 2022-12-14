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
import { Question } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SearchInput } from 'src/common/models/search-input.model';
import { CreateQuestionInput } from './dto/create-question-input';
import { UpdateQuestionInput } from './dto/update-question-input';
import { QuestionService } from './question.service';

@Controller('question')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get()
  async getQuestion(@Req() req: Request): Promise<Question> {
    const id = req.query.id as string;
    return this.questionService.getQuestion(id);
  }

  @Put()
  async updateQuestion(@Body() data: UpdateQuestionInput & { id: string }) {
    const { id, ...newQuestionData } = data;
    return this.questionService.updateQuestion(id, newQuestionData);
  }

  @Patch()
  async updateMultipleQuestion(
    @Body() data: UpdateQuestionInput & { ids: string[] }
  ) {
    const { ids, ...newQuestionData } = data;
    return this.questionService.updateMultipleQuestion(ids, newQuestionData);
  }

  @Delete()
  async deleteQuestion(@Req() req: Request): Promise<Question> {
    const id = req.query.id as string;
    return this.questionService.deleteQuestion(id);
  }

  @Post('search')
  async searchQuestion(@Body() data: SearchInput): Promise<Question[]> {
    return this.questionService.searchQuestion(data);
  }

  @Post()
  async createQuestion(@Body() data: CreateQuestionInput): Promise<Question> {
    return this.questionService.createQuestion(data);

  }
}
