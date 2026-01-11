import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginate.html',
  styleUrl: './paginate.css',
})
export class PaginateComponent {

  // Página atual
  @Input() currentPage = 1;

  // Controle de limites
  @Input() hasNext = false;
  @Input() hasPrev = false;

  // Evento para o componente pai
  @Output() pageChange = new EventEmitter<number>();

  next() {
    if (!this.hasNext) return;
    this.pageChange.emit(this.currentPage + 1);
  }

  prev() {
    if (!this.hasPrev) return;
    this.pageChange.emit(this.currentPage - 1);
  }
}
