import { Test, TestingModule } from '@nestjs/testing';
import { ExaminationController } from './examination.controller';

describe('ExaminationController', () => {
  let controller: ExaminationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExaminationController],
    }).compile();

    controller = module.get<ExaminationController>(ExaminationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
