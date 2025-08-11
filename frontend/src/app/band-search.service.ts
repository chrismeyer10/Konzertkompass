import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  map,
  of,
  switchMap,
  forkJoin,
  catchError,
} from 'rxjs';
import { Band } from './models/band';

@Injectable({ providedIn: 'root' })
export class BandSearchService {
  constructor(private http: HttpClient) {}

  search(term: string): Observable<Band[]> {
    if (!term.trim()) {
      return of([]);
    }

    const url = `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(
      term
    )}&fmt=json&limit=10`;
    return this.http.get<any>(url).pipe(
      switchMap((resp) => {
        const bands = (resp.artists || []).map(
          (a: any) => ({ id: a.id, name: a.name } as Band)
        );
        if (!bands.length) {
          return of([]);
        }
        const requests = bands.map((band: Band) =>
          this.getUpcomingEvents(band.id).pipe(
            map((events) => ({ ...band, upcomingEvents: events }))
          )
        );
        return forkJoin(requests) as Observable<Band[]>;
      })
    );
  }

  private getUpcomingEvents(id: string): Observable<string[]> {
    const url = `https://musicbrainz.org/ws/2/event?artist=${id}&fmt=json`;
    return this.http.get<any>(url).pipe(
      map((resp) => {
        const today = new Date();
        const cutoff = new Date();
        cutoff.setDate(today.getDate() + 21);
        return (resp.events || [])
          .map((e: any) => e['life-span']?.begin)
          .filter((d: string) => {
            const date = new Date(d);
            return date >= today && date <= cutoff;
          });
      }),
      catchError(() => of([]))
    );
  }
}
