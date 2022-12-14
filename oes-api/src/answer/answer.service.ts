import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateAnswerInput } from './dto/create-answer-input';
import { SearchAnswerInput } from './dto/search-answer-input';
import { UpdateAnswerInput } from './dto/update-answer-input';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async getAnswer(id: string) {
    try {
      const response = await this.prisma.answer.findFirst({
        where: { id, isEnabled: true },
      });
      return response;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new BadRequestException(`Answer not found.`);
      }
      throw e;
    }
  }

  async updateMultipleAnswer(ids: string[], data: UpdateAnswerInput) {
    try {
      const response = await this.prisma.answer.updateMany({
        where: { id: { in: ids } },
        data: data,
      });

      return response;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new BadRequestException(`Answer not found.`);
      }
      throw e;
    }
  }

  updateAnswer(answerId: string, newAnswerData: UpdateAnswerInput) {
    try {
      const response = this.prisma.answer.update({
        data: newAnswerData,
        where: { id: answerId },
      });
      return response;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new BadRequestException(`Answer not found.`);
      }
      throw e;
    }
  }

  deleteAnswer(answerId: string) {
    try {
      const response = this.prisma.answer.update({
        where: { id: answerId },
        data: { isEnabled: false },
      });
      return response;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new BadRequestException(`Answer not found.`);
      }
      throw new Error(e);
    }
  }

  searchAnswer(data: SearchAnswerInput) {
    const { keyword, pageNum, pageSize, orderBy, sort } = data;

    return this.prisma.answer.findMany({
      take: pageSize,
      skip: (pageNum - 1) * pageSize,
      orderBy: { [orderBy]: sort },
      where: {
        isEnabled: true,
        OR: [{ content: { contains: keyword } }],
      },
    });
  }

  async createAnswer(data: CreateAnswerInput) {
    const { content, isCorrect } = data;
    try {
      const response = await this.prisma.answer.create({
        data: {
          content: content,
          isCorrect: isCorrect,
        },
      });
      return response;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new BadRequestException(`Answer not found.`);
      }
      throw e;
    }
  }
}
