import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() search = new EventEmitter<string>();

  repository = '';
  placeholderText = 'Buscar repositório...';
  hasParameter = true;

onSearch(input: HTMLInputElement) {
  if (!this.hasParam(this.repository)) return;

  this.search.emit(this.repository.trim());
  input.blur();
}



  hasParam(param: string): boolean {
    // if (!param.trim()) {
    //   this.hasParameter = false;
    //   this.placeholderText = 'Necessário inserir o nome do repositório';
    //   return false;
    // }

    this.hasParameter = true;
    this.placeholderText = 'Buscar repositório...';
    return true;
  }
}
