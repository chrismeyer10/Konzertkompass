import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BandSearchService } from './band-search.service';
import { Band } from './models/band';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-band-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.scss'
})
export class BandListComponent implements OnInit, OnDestroy {
  searchTerm = '';
  suggestions: Band[] = [];
  bands: Band[] = [];

  private searchTerms = new Subject<string>();
  private searchSub?: Subscription;

  constructor(private bandSearch: BandSearchService) {}

  ngOnInit() {
    this.searchSub = this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.bandSearch.search(term))
      )
      .subscribe((bands) => (this.suggestions = bands));
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }

  search(term: string) {
    this.searchTerms.next(term);
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
