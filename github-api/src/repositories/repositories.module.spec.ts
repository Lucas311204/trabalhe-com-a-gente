import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesModule } from './repositories.module';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('RepositoriesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [
        RepositoriesService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('FAKE_TOKEN'),
          },
        },
      ],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should have RepositoriesController', () => {
    const controller = module.get<RepositoriesController>(RepositoriesController);
    expect(controller).toBeDefined();
  });

  it('should have RepositoriesService', () => {
    const service = module.get<RepositoriesService>(RepositoriesService);
    expect(service).toBeDefined();
  });
});
