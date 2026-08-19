// Register UI5 locale data (CLDR) and component i18n assets (tooltips, labels, aria-text)
// so language switching works without CDN fallback
import '@ui5/webcomponents-localization/dist/Assets.js';
import '@ui5/webcomponents/dist/Assets.js';
// Register all SAP icons (v4 + v5) so any icon name used in examples resolves correctly
// regardless of the active theme (sap_horizon uses SAP-icons-v5 by default)
import '@ui5/webcomponents-icons/dist/AllIcons.js';

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
