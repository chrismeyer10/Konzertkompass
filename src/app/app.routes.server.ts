import { RenderMode, ServerRoute } from '@angular/ssr';

/** Spezielle Routen für Server-Side-Rendering. */
export const serverRoutes: ServerRoute[] = [
  { path: 'find-my-concert/:band', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender }
];
