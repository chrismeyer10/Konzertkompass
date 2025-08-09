import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BandSearchService } from './band-search.service';
import { Band } from './models/band';

@Component({
  selector: 'app-band-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.scss'
})
export class BandListComponent {
  searchTerm = '';
  suggestions: Band[] = [];
  bands: Band[] = [];

  constructor(private bandSearch: BandSearchService) {}

  search(term: string) {
    this.bandSearch.search(term).subscribe(bands => (this.suggestions = bands));
  }

  addBand(band: Band) {
    this.bands.push(band);
    this.searchTerm = '';
    this.suggestions = [];
  }

  removeBand(band: Band) {
    this.bands = this.bands.filter(b => b.id !== band.id);
  }
}
