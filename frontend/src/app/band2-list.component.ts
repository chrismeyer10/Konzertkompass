import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorldBandSearchService } from './world-band-search.service';
import { Band } from './models/band';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-band2-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './band2-list.component.html',
  styleUrl: './band2-list.component.scss'
})
export class Band2ListComponent implements OnInit, OnDestroy {
  searchTerm = '';
  suggestions: Band[] = [];

  private searchTerms = new Subject<string>();
  private searchSub?: Subscription;

  constructor(private bandSearch: WorldBandSearchService) {}

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
}
