import { registerLocaleData } from '@angular/common';
import localeKa from '@angular/common/locales/ka';
import localeUk from '@angular/common/locales/uk';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';

// Register additional locales for i18n examples
registerLocaleData(localeUk, 'uk-UA');
registerLocaleData(localeKa, 'ka-GE');

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
