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
  errorMessage = signal(false);

  currentSearch = signal('node'); 
  currentPage = signal(1);      
  lastPageNumber = signal(1);
       

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.reloadRepositories();
  }

  renderRepositories(items: any[]) {
    this.repositories.set(items ?? []);
  }


  searchRepositories(name: string, page: number) {
    this.isLoading.set(true);
    if(!name) {
      this.errorMessage.set(true);
    }
    

    return this.http
      .get<any>('http://localhost:3000/repositories', {
        params: { name, page },
      })
      .pipe(finalize(() => this.isLoading.set(false)));
  }

  private extractPageFromUrl(url?: string): number {
  if (!url) return 1;

  const match = url.match(/page=(\d+)/);
  return match ? Number(match[1]) : 1;
}

  reloadRepositories() {
  this.searchRepositories(this.currentSearch(), this.currentPage())
    .subscribe({
      next: res => {
        this.renderRepositories(res.items);

        if (res.links?.last) {
          const lastPage = this.extractPageFromUrl(res.links.last);
          this.lastPageNumber.set(lastPage);
        }
      },
      error: () => this.renderRepositories([]),
    });
}



  trackById(index: number, item: any) {
  return item.id ?? index;
}

  onSearch(term: string) {
  if (!term.trim()) {
    this.errorMessage.set(true);
    return;
  }

  this.errorMessage.set(false);

  this.currentSearch.set(term);
  this.currentPage.set(1);
  this.reloadRepositories();
}


  nextPage() {
    if (this.isLoading()) return;

    this.currentPage.set(this.currentPage() + 1);
    this.reloadRepositories();
  }

  firstPage() {
  if (this.isLoading()) return;

  this.currentPage.set(1);
  this.reloadRepositories();
}

lastPage() {
  if (this.isLoading()) return;

  this.currentPage.set(this.lastPageNumber());
  this.reloadRepositories();
}


  prevPage() {
    if (this.currentPage() === 1 || this.isLoading()) return;

    this.currentPage.set(this.currentPage() - 1);
    this.reloadRepositories();
  }
}
