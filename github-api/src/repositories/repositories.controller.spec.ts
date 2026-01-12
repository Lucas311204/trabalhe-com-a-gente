import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';
import { of } from 'rxjs';

describe('RepositoriesController', () => {
  let controller: RepositoriesController;
  let service: RepositoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [
        {
          provide: RepositoriesService,
          useValue: {
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RepositoriesController>(RepositoriesController);
    service = module.get<RepositoriesService>(RepositoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call search with default values when no query params', (done) => {
    const mockResult = of({
      total_count: 1,
      items: [{ id: 123, name: 'repo-test' }],
      links: {},
    });

    (service.search as jest.Mock).mockReturnValueOnce(mockResult);

    controller.search("bootstrap", undefined).subscribe(result => {
      expect(service.search).toHaveBeenCalledWith('bootstrap', 1);
      expect(result).toEqual({
        total_count: 1,
        items: [{ id: 123, name: 'repo-test' }],
        links: {},
      });
      done();
    });
  });

  it('should call search with provided query params', (done) => {
    const mockResult = of({
      total_count: 2,
      items: [{ id: 456, name: 'repo-angular' }],
      links: {},
    });

    (service.search as jest.Mock).mockReturnValueOnce(mockResult);

    controller.search('angular', '2').subscribe(result => {
      expect(service.search).toHaveBeenCalledWith('angular', 2);
      expect(result).toEqual({
        total_count: 2,
        items: [{ id: 456, name: 'repo-angular' }],
        links: {},
      });
      done();
    });
  });
});
