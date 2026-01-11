import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
})
export class CardComponent {
  @Input() repo!: any;
}
