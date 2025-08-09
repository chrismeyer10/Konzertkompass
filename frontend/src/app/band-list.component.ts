import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-band-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.scss'
})
export class BandListComponent {
  newBand = '';
  bands: string[] = [];

  addBand() {
    const name = this.newBand.trim();
    if (name) {
      this.bands.push(name);
      this.newBand = '';
    }
  }

  removeBand(band: string) {
    this.bands = this.bands.filter(b => b !== band);
  }
}
