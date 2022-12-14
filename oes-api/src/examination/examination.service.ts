import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { SearchInput } from 'src/common/models/search-input.model';
import { CreateExaminationInput } from './dto/create-examination-input';
import { UpdateExaminationStatusInput } from './dto/update-examinationStatus-input';

@Injectable()
export class ExaminationService {
  constructor(private prisma: PrismaService) {}

  async getExamination(id: string) {
    try {
      const response = await this.prisma.examination.findUnique({
        where: { id },
      });
      return response;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new BadRequestException(`Examination not found.`);
      }
      throw new Error(e);
    }
  }

  async updateMultipleExamination(ids: string[], data: UpdateExaminationStatusInput) {
    try {
      const response = await this.prisma.examination.updateMany({
        where: { id: { in: ids } },
        data: data,
      });
      return response;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new BadRequestException(`Examination not found.`);
      }
      throw new Error(e);
    }
  }

  updateExamination(examinationId: string, newExaminationData: UpdateExaminationStatusInput) {
    try {
      const response = this.prisma.examination.update({
        data: newExaminationData,
        where: { id: examinationId },
      });
      return response;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new BadRequestException(`Examination not found.`);
      }
      throw new Error(e);
    }
  }

  deleteExamination(examinationId: string) {
    try {
      const response = this.prisma.examination.update({
        where: { id: examinationId },
        data: { isEnabled: false },
      });
      return response;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new BadRequestException(`Examination not found.`);
      }
      throw new Error(e);
    }
  }

  searchExamination(data: SearchInput) {
    const { keyword, pageNum, pageSize, orderBy, sort } = data;

    return this.prisma.examination.findMany({
      take: pageSize,
      skip: (pageNum - 1) * pageSize,
      orderBy: { [orderBy]: sort },
      where: {
        isEnabled: true,
        OR: [{ topicId: { contains: keyword } }],
      },
    });
  }

  async createExamination(data: CreateExaminationInput) {
    const { id, startAt, status, isEnabled } = data;
    try {
      const response = await this.prisma.examination.create({
        data: {
          id: id,
          startAt: startAt,
          status: status,
          isEnabled: isEnabled
        },
      });
      return response;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new BadRequestException(`Examination not found.`);
      }
      throw new Error(e);
    }
  }
}
