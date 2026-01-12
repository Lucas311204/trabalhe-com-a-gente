import { Controller, Get, Query } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {

  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  search(
    @Query('name') name: string,
    @Query('page') page?: string
  ) {
    return this.repositoriesService.search(
      name,
      page ? Number(page) : 1
    );
  }

}
