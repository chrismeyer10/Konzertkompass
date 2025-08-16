import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BandEventsService } from './band-events.service';

describe('BandEventsService', () => {
  let service: BandEventsService;

  // Testumgebung vorbereiten
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BandEventsService);
  });

  // Prüft, ob für TESTBAND ein Mock-Ereignis geliefert wird
  it('returns mock event for TESTBAND', (done) => {
    service.getUpcomingInGermany('TESTBAND').subscribe((events) => {
      expect(events.length).toBe(1);
      const event = events[0];
      expect(event.venue.name).toBe('Berlin Arena');
      expect(event.venue.latitude).toBe('52.5200');
      expect(event.venue.longitude).toBe('13.4050');
      done();
    });
  });
});
