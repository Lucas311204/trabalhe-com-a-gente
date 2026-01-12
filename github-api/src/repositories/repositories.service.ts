import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

@Injectable()
export class RepositoriesService {

  private readonly githubUrl = 'https://api.github.com/search/repositories';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  search(query: string, page : number) {
    const token = this.configService.get<string>('TOKEN');

    return this.httpService
      .get(this.githubUrl, {
        params: {
          q: query,
          page,
          per_page: 10
        },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json'
        }
      })
      .pipe(
        map(response => {
          const linkHeader = response.headers['link'];
          return {
            total_count: response.data.total_count,
            items: response.data.items,
            links: this.parseLinkHeader(linkHeader)
          };
        })
      );
  }

  nextPage(link: string) {
    return this.httpService.get(link).pipe(
      map(response => {
        const linkHeader = response.headers['link'];
        return {
          total_count: response.data.total_count,
          items: response.data.items,
          links: this.parseLinkHeader(linkHeader)
        };
      })
    );
  }

  prevPage(link: string) {
    return this.httpService.get(link).pipe(
      map(response => {
        const linkHeader = response.headers['link'];
        return {
          total_count: response.data.total_count,
          items: response.data.items,
          links: this.parseLinkHeader(linkHeader)
        };
      })
    );
  }

  lastPage(link: string) {
    return this.httpService.get(link).pipe(
      map(response => {
        const linkHeader = response.headers['link'];
        return {
          total_count: response.data.total_count,
          items: response.data.items,
          links: this.parseLinkHeader(linkHeader)
        };
      })
    );
  }

  firstPage(link: string) {
    return this.httpService.get(link).pipe(
      map(response => {
        const linkHeader = response.headers['link'];
        return {
          total_count: response.data.total_count,
          items: response.data.items,
          links: this.parseLinkHeader(linkHeader)
        };
      })
    );
  }


  private parseLinkHeader(header: string | undefined) {
    if (!header) return {};

    const links = {};

    header.split(',').forEach(part => {
      const section = part.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const rel = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[rel] = url;
    });

    return links;
  }
}
