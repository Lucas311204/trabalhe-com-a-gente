import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { finalize } from 'rxjs';

import { Header } from '../../components/header/header';
import { CardComponent } from '../../components/card-component/card-component';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [Header, CardComponent, CommonModule, HttpClientModule],
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css'],
})
export class MainPage implements OnInit {
  repositories = signal<any[]>([]); 
  isLoading = signal(false);        

  currentSearch = signal('bootstrap'); 
  currentPage = signal(1);             

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.reloadRepositories();
  }

  renderRepositories(items: any[]) {
    this.repositories.set(items ?? []);
  }


  searchRepositories(name: string, page: number) {
    this.isLoading.set(true);

    return this.http
      .get<any>('http://localhost:3000/repositories', {
        params: { name, page },
      })
      .pipe(finalize(() => this.isLoading.set(false)));
  }


  reloadRepositories() {
    this.searchRepositories(this.currentSearch(), this.currentPage())
      .subscribe({
        next: res => this.renderRepositories(res.items),
        error: () => this.renderRepositories([]),
      });
  }

  trackById(index: number, item: any) {
  return item.id ?? index;
}

  onSearch(term: string) {
    if (!term.trim() || this.isLoading()) return;

    this.currentSearch.set(term);
    this.currentPage.set(1);
    this.reloadRepositories();
  }

  nextPage() {
    if (this.isLoading()) return;

    this.currentPage.set(this.currentPage() + 1);
    this.reloadRepositories();
  }

  prevPage() {
    if (this.currentPage() === 1 || this.isLoading()) return;

    this.currentPage.set(this.currentPage() - 1);
    this.reloadRepositories();
  }
}
