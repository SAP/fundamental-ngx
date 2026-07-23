import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { Ui5WebcomponentsMainThemingService } from '@fundamental-ngx/ui5-webcomponents/theming';

export { Ui5WebcomponentsMainThemingService };

export function provideUi5Webcomponents(): EnvironmentProviders {
    return provideEnvironmentInitializer(() => {
        inject(Ui5WebcomponentsMainThemingService);
    });
}
