import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';

interface Event {
  datetime: string;
  venue: {
    country: string;
    latitude: string;
    longitude: string;
    name: string;
  };
}

@Injectable({ providedIn: 'root' })
export class BandEventsService {
  constructor(private http: HttpClient) {}

  getUpcomingInGermany(band: string): Observable<Event[]> {
    const url = `https://rest.bandsintown.com/artists/${encodeURIComponent(
      band
    )}/events?app_id=test`;
    return this.http.get<Event[]>(url).pipe(
      map((events) =>
        (events || []).filter(
          (e) =>
            e.venue.country === 'Germany' &&
            this.isWithinNextThreeMonths(e.datetime)
        )
      ),
      catchError(() => of([]))
    );
  }

  private isWithinNextThreeMonths(dateStr: string): boolean {
    const eventDate = new Date(dateStr);
    const now = new Date();
    const threeMonths = new Date(now);
    threeMonths.setMonth(now.getMonth() + 3);
    return eventDate >= now && eventDate <= threeMonths;
  }
}
