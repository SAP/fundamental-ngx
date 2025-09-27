import { Injectable } from '@angular/core';
import { WebcomponentsThemingProvider } from '@fundamental-ngx/ui5-webcomponents-base/theming';

@Injectable({ providedIn: 'root' })
class Ui5Webcomponents${PACKAGE_SUFFIX_PLACEHOLDER}ThemingService extends WebcomponentsThemingProvider {
  name = 'ui-5-webcomponents-theming-service';
  constructor() {
    super(
      () => import('@ui5/webcomponents/dist/generated/json-imports/Themes.js'),
    );
  }
}

export { Ui5Webcomponents${PACKAGE_SUFFIX_PLACEHOLDER}ThemingService };