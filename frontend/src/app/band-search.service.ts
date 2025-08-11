import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, catchError } from 'rxjs';
import { Band } from './models/band';

@Injectable({ providedIn: 'root' })
export class BandSearchService {
  private bands: Band[] = [];
  private loaded = false;

  constructor(private http: HttpClient) {}

  private loadBands(): Observable<Band[]> {
    if (this.loaded) {
      return of(this.bands);
    }
    return this.http.get<Band[]>('/bands.json').pipe(
      map((bands) => {
        this.bands = bands;
        this.loaded = true;
        return bands;
      }),
      catchError(() => of([]))
    );
  }

  search(term: string): Observable<Band[]> {
    if (!term.trim()) {
      return of([]);
    }
    const lower = term.toLowerCase();
    return this.loadBands().pipe(
      map((bands) =>
        bands
          .filter((b) => b.name.toLowerCase().startsWith(lower))
          .slice(0, 10)
      ),
      catchError(() => of([]))
    );
  }
}
