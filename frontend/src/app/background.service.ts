import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BackgroundService {
  private images = ['images/bg1.svg', 'images/bg2.svg', 'images/bg3.svg'];

  getSuggestions(): string[] {
    return this.images;
  }

  setBackground(url: string) {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${url})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
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
