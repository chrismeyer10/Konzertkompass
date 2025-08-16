import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
/** Dienst zum Verwalten des Seitenhintergrunds. */
export class BackgroundService {
  private images = ['images/bg1.svg', 'images/bg2.svg', 'images/bg3.svg'];

  /** Gibt eine Liste verfügbarer Hintergrundbilder zurück. */
  getSuggestions(): string[] {
    return this.images;
  }

  /**
   * Setzt das angegebene Hintergrundbild und speichert die Auswahl.
   */
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

  /**
   * Lädt ein zuvor gespeichertes Hintergrundbild.
   */
  loadSavedBackground() {
    if (typeof window !== 'undefined') {
      const url = window.localStorage.getItem('background');
      if (url) {
        this.setBackground(url);
      }
    }
  }
}
