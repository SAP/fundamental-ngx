import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { Ui5Webcomponents${PACKAGE_SUFFIX_PLACEHOLDER}ThemingService } from '@fundamental-ngx/ui5-webcomponents${PACKAGE_SUFFIX_LOWER_PLACEHOLDER}/theming';

export { Ui5Webcomponents${PACKAGE_SUFFIX_PLACEHOLDER}ThemingService };

export function provideUi5Webcomponents${FUNCTION_SUFFIX_PLACEHOLDER}(): EnvironmentProviders {
    return provideEnvironmentInitializer(() => {
        inject(Ui5Webcomponents${PACKAGE_SUFFIX_PLACEHOLDER}ThemingService);
    });
}
