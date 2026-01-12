import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesService } from './repositories.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('RepositoriesService', () => {
  let service: RepositoriesService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepositoriesService,
        {
          provide: HttpService,
          useValue: { get: jest.fn() }, 
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('fake-token') }, 
        },
      ],
    }).compile();

    service = module.get<RepositoriesService>(RepositoriesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should search repositories', (done) => {
    const mockResponse = {
      data: { total_count: 1, items: [{ id: 123, name: 'repo-test' }] },
      headers: { link: '<https://api.github.com/search/repositories?q=angular&page=2>; rel="next"' },
    };

    (httpService.get as jest.Mock).mockReturnValueOnce(of(mockResponse));

    service.search('angular', 1).subscribe(result => {
      const links = result.links as Record<string, string>; 
      expect(result.total_count).toBe(1);
      expect(result.items).toEqual([{ id: 123, name: 'repo-test' }]);
      expect(links.next).toBe('https://api.github.com/search/repositories?q=angular&page=2');
      done();
    });

    expect(httpService.get).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories',
      expect.objectContaining({
        params: { q: 'angular', page: 1, per_page: 10 },
        headers: expect.objectContaining({
          Authorization: 'Bearer fake-token',
          Accept: 'application/vnd.github+json',
        }),
      }),
    );
  });

  
  const paginationMethods: ('nextPage' | 'prevPage' | 'firstPage' | 'lastPage')[] = [
    'nextPage', 'prevPage', 'firstPage', 'lastPage'
  ];

  paginationMethods.forEach(method => {
    it(`should call ${method} and return parsed links`, (done) => {
      const mockResponse = {
        data: { total_count: 2, items: [{ id: 456, name: `repo-${method}` }] },
        headers: { link: '<https://api.github.com/search/repositories?page=3>; rel="next"' },
      };

      (httpService.get as jest.Mock).mockReturnValueOnce(of(mockResponse));


      service[method]('https://api.github.com/search/repositories?page=2')
        .subscribe(result => {
          const links = result.links as Record<string, string>; // cast para evitar erro de tipo
          expect(result.total_count).toBe(2);
          expect(result.items).toEqual([{ id: 456, name: `repo-${method}` }]);
          expect(links.next).toBe('https://api.github.com/search/repositories?page=3');
          done();
        });
    });
  });


  it('should parse link header correctly', () => {

    const header = '<https://api.github.com/search/repositories?page=2>; rel="next", <https://api.github.com/search/repositories?page=5>; rel="last"';

    const links = service['parseLinkHeader'](header) as Record<string, string>;

    expect(links.next).toBe('https://api.github.com/search/repositories?page=2');
    expect(links.last).toBe('https://api.github.com/search/repositories?page=5');
  });

  it('should return empty object if link header is undefined', () => {
    const links = service['parseLinkHeader'](undefined) as Record<string, string>;
    expect(links).toEqual({});
  });
});
