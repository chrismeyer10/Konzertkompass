import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Bootstrap der Angular-Anwendung mit dem Root-Component
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
