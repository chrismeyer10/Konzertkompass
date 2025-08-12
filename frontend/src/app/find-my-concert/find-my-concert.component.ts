import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WorldBandSearchService } from '../world-band-search.service';
import { Band } from '../models/band';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-find-my-concert',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './find-my-concert.component.html',
  styleUrl: './find-my-concert.component.scss',
})
export class FindMyConcertComponent implements OnInit, OnDestroy {
  searchTerm = '';
  suggestions: Band[] = [];

  private searchTerms = new Subject<string>();
  private searchSub?: Subscription;

  constructor(
    private bandSearch: WorldBandSearchService,
    private router: Router
  ) {}

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

  goToBand(band: Band) {
    this.router.navigate(['/find-my-concert', band.name]);
  }
}
