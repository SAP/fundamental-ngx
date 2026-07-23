import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { Ui5WebcomponentsFioriThemingService } from '@fundamental-ngx/ui5-webcomponents-fiori/theming';

export { Ui5WebcomponentsFioriThemingService };

export function provideUi5WebcomponentsFiori(): EnvironmentProviders {
    return provideEnvironmentInitializer(() => {
        inject(Ui5WebcomponentsFioriThemingService);
    });
}
