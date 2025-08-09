import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BackgroundService {
  getSuggestions(count = 5): string[] {
    return Array.from({ length: count }, (_, i) =>
      `https://source.unsplash.com/1600x900/?band&sig=${i}`
    );
  }

  setBackground(url: string) {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundImage = `url(${url})`;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('background', url);
    }
  }

  loadSavedBackground() {
    if (typeof window !== 'undefined') {
      const url = window.localStorage.getItem('background');
      if (url) {
        this.setBackground(url);
      }
    }
  }
}
