import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { Band } from './models/band';

@Injectable({ providedIn: 'root' })
export class WorldBandSearchService {
  constructor(private http: HttpClient) {}

  /**
   * Sucht weltweit nach Bands über die MusicBrainz-API.
   */
  search(term: string): Observable<Band[]> {
    if (!term.trim()) {
      return of([]);
    }
    const params = new HttpParams()
      .set('query', term)
      .set('fmt', 'json')
      .set('limit', '10');
    return this.http
      .get<any>('https://musicbrainz.org/ws/2/artist', { params })
      .pipe(
        map((res) =>
          (res.artists || [])
            .sort((a: any, b: any) => (b.score || 0) - (a.score || 0))
            .map((artist: any) => ({ id: artist.id, name: artist.name }))
        ),
        catchError(() => of([]))
      );
  }
}
