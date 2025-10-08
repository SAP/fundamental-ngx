import { Injectable } from '@angular/core';
import { WebcomponentsThemingProvider } from '@fundamental-ngx/ui5-webcomponents-base/theming';

@Injectable({ providedIn: 'root' })
class Ui5Webcomponents${PACKAGE_SUFFIX_PLACEHOLDER}ThemingService extends WebcomponentsThemingProvider {
  name = 'ui-5-webcomponents-${PACKAGE_SUFFIX_LOWER_PLACEHOLDER}-theming-service';
  constructor() {
    super(
      () => import('@ui5/webcomponents${PACKAGE_SUFFIX_LOWER_PLACEHOLDER}/dist/generated/json-imports/Themes.js'),
    );
  }
}

export { Ui5Webcomponents${PACKAGE_SUFFIX_PLACEHOLDER}ThemingService };
