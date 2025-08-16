import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/** Bootstrap-Funktion für das Server-Rendering. */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
