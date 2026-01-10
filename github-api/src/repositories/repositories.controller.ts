import { Controller, Get, Query } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {

  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  search(
    @Query('name') name?: string,
    @Query('page') page?: string
  ) {
    console.log(name, page);
    return this.repositoriesService.search(
      name || 'bootstrap',
      page ? Number(page) : 1
    );
  }

  @Get()
  nextPage(
    @Query('link') link: string
  ) {
    return this.repositoriesService.nextPage(link);
  }

  @Get()
  prevPage(
    @Query('link') link: string
  ) {
    return this.repositoriesService.prevPage(link);
  }

  @Get()
  firstPage(
    @Query('link') link: string
  ) {
    return this.repositoriesService.firstPage(link);
  }

  @Get()
  lastPage(
    @Query('link') link: string
  ) {
    return this.repositoriesService.lastPage(link);
  }
}
