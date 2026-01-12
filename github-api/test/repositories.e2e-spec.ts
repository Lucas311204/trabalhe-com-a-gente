import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { RepositoriesModule } from '../src/repositories/repositories.module';
import { RepositoriesService } from '../src/repositories/repositories.service';
import { RepositoriesController } from '../src/repositories/repositories.controller';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('RepositoriesController (E2E - isolated)', () => {
  let app: INestApplication;
  let httpServiceGetMock: jest.Mock;

  beforeAll(async () => {
    httpServiceGetMock = jest.fn().mockReturnValue(
      of({
        data: {
          total_count: 3,
          items: [
            { id: 1, name: 'repo1' },
            { id: 2, name: 'repo2' },
            { id: 3, name: 'repo3' },
          ],
        },
        headers: {
          link:
            '<https://api.github.com/repositories?page=2>; rel="next", <https://api.github.com/repositories?page=5>; rel="last", <https://api.github.com/repositories?page=1>; rel="first", <https://api.github.com/repositories?page=1>; rel="prev"',
        },
      }),
    );

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [
        RepositoriesService,
        {
          provide: HttpService,
          useValue: { get: httpServiceGetMock },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('FAKE_TOKEN') },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('/repositories (GET) should return repos with default query', async () => {
    const res = await request(app.getHttpServer()).get('/repositories');

    expect(res.status).toBe(200);
    expect(res.body.total_count).toBe(3);
    expect(res.body.items[0].name).toBe('repo1');
    expect(res.body.links.next).toBe('https://api.github.com/repositories?page=2');
  });

  it('/repositories (GET) should call service with query params', async () => {
    const res = await request(app.getHttpServer()).get('/repositories?name=angular&page=2');

    expect(res.status).toBe(200);
    expect(httpServiceGetMock).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories',
      expect.objectContaining({
        params: { q: 'angular', page: 2, per_page: 10 },
        headers: expect.any(Object),
      }),
    );
  });
});
