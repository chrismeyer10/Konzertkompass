import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundService } from './background.service';

@Component({
  selector: 'app-background-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background-selector.component.html',
  styleUrl: './background-selector.component.scss'
})
export class BackgroundSelectorComponent {
  images: string[];

  constructor(private bg: BackgroundService) {
    this.images = this.bg.getSuggestions();
  }

  select(url: string) {
    this.bg.setBackground(url);
  }
}
