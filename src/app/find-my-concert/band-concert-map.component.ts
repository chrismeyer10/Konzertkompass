import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BandEventsService } from '../band-events.service';

declare let L: any;

@Component({
  selector: 'app-band-concert-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './band-concert-map.component.html',
  styleUrl: './band-concert-map.component.scss',
})
export class BandConcertMapComponent implements OnInit, AfterViewInit {
  band = '';
  private map?: any;
  selectedEvent?: {
    datetime: string;
    venue: {
      country: string;
      latitude: string;
      longitude: string;
      name: string;
    };
  };

  constructor(
    private route: ActivatedRoute,
    private events: BandEventsService
  ) {}

  /**
   * Reagiert auf Routenänderungen und lädt entsprechende Events.
   */
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.band = params.get('band') ?? '';
      this.selectedEvent = undefined;
      if (this.map) {
        this.map.eachLayer((layer: any) => {
          if (layer instanceof L.Marker) {
            this.map?.removeLayer(layer);
          }
        });
      }
      this.loadEvents();
    });
  }

  /**
   * Initialisiert die Karte nach dem View-Rendering.
   */
  ngAfterViewInit() {
    this.loadLeaflet().then(() => {
      this.map = L.map('map').setView([51.1657, 10.4515], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map!);
    });
  }

  /**
   * Lädt Konzertdaten und setzt Marker auf der Karte.
   */
  private loadEvents() {
    if (!this.band) return;
    this.events.getUpcomingInGermany(this.band).subscribe((events) => {
      if (!this.map) return;
      for (const e of events) {
        const lat = parseFloat(e.venue.latitude);
        const lng = parseFloat(e.venue.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          L.marker([lat, lng])
            .bindPopup(`${e.venue.name}`)
            .addTo(this.map);
        }
      }
      if (events.length > 0) {
        this.selectedEvent = events[0];
        const lat = parseFloat(this.selectedEvent.venue.latitude);
        const lng = parseFloat(this.selectedEvent.venue.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          this.map.flyTo([lat, lng], 10, { animate: true, duration: 1.5 });
        }
      }
    });
  }

  /**
   * Lädt die Leaflet-Bibliothek dynamisch nach.
   */
  private loadLeaflet(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof L !== 'undefined') {
        resolve();
        return;
      }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href =
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }
}
