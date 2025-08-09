import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Band } from './models/band';

@Injectable({ providedIn: 'root' })
export class BandSearchService {
  constructor(private http: HttpClient) {}

  search(term: string): Observable<Band[]> {
    if (!term.trim()) {
      return of([]);
    }

    const url = `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(term)}&fmt=json&limit=10`;
    return this.http.get<any>(url).pipe(
      map((resp) =>
        (resp.artists || []).map((a: any) => ({ id: a.id, name: a.name } as Band))
      )
    );
  }
}
