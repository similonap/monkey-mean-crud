import { Test, TestingModule } from '@nestjs/testing';
import { MonkeysService } from './monkeys.service';

describe('MonkeysService', () => {
  let service: MonkeysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonkeysService],
    }).compile();

    service = module.get<MonkeysService>(MonkeysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
