import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'find-my-concert/:band', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender }
];
