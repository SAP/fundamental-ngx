import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { Ui5WebcomponentsThemingService } from '@fundamental-ngx/ui5-webcomponents-base/theming';
import { Ui5ThemingBridgeService } from './ui5-theming-bridge.service';

export function provideUi5ThemingBridge(): EnvironmentProviders {
    return provideEnvironmentInitializer(() => {
        // Force-construct the default theming provider so it registers itself with
        // Ui5ThemingService. Without this, _providers stays empty and the registry's
        // effect early-returns — UI5 setTheme() is never called (issue #14394).
        inject(Ui5WebcomponentsThemingService);
        inject(Ui5ThemingBridgeService);
    });
}
